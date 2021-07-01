import * as express from 'express';
import { getConnection } from 'typeorm';
import { User } from '../db/entities/User';
import { Game } from '../db/entities/Game';
import { playGame } from '../utils/logic';
import { deal } from '../utils/deck';

const router = express.Router();

// Get game by id. `id` is a required query parameter
router.get('/', async (req, res) => {
  const gameRepository = getConnection().getRepository(Game); // you can also get it via getConnection().getRepository() or getManager().getRepository()

  const game = await gameRepository.findOne({
    where: { id: req.query.id },
    relations: ['winner', 'loser'],
    select: ['id', 'moves'],
  });

  res.send(game);
});

// Get shuffled deck of cards for new game. Cards are split into two hands
router.get('/deal', async (req, res) => {
  res.send(deal());
});

// Create new game, required POST body:
// player1      = name of first user
// deck1        = deck of cards for first user
// player2      = name of second user
// deck2        = deck of cards for second user
router.post('/play', async (req, res) => {
  const userRepository = getConnection().getRepository(User);
  const gameRepository = getConnection().getRepository(Game);

  const player1 = {
    name: req.body.player1,
    deck: req.body.deck1,
  };

  const player2 = {
    name: req.body.player2,
    deck: req.body.deck2,
  };

  const stats = playGame(player1.deck, player2.deck);

  const game = new Game();

  const users = await userRepository.find({
    where: [{ name: player1.name }, { name: player2.name }],
  });

  let user1: User = users.filter((user) => user.name === player1.name)[0];

  if (!user1) {
    user1 = await userRepository.save({
      name: player1.name,
    });
  }

  let user2: User = users.filter((user) => user.name === player2.name)[0];

  if (!user2) {
    user2 = await userRepository.save({
      name: player2.name,
    });
  }

  if (stats[0].length === 0) {
    game.winner = user2;
    game.loser = user1;
  } else {
    game.winner = user1;
    game.loser = user2;
  }

  game.moves = JSON.stringify(stats[2]);

  res.send(await gameRepository.save(game));
});

export default router;
