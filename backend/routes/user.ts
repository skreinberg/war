import * as express from 'express';
import { getConnection } from 'typeorm';
import { User } from '../db/entities/User';

const router = express.Router();

// Get all users and respective all-time records
router.get('/', async (req, res) => {
  const userRepository = getConnection().getRepository(User);

  const users = await userRepository.find({
    where: {},
    relations: ['wins', 'losses'],
  });

  res.send(
    users.map((user) => ({
      user,
      wins: {
        total: user.wins.length,
        games: user.wins,
      },
      losses: {
        total: user.losses.length,
        games: user.losses,
      },
    }))
  );
});

// Create new game, required POST body:
// name  = name of new user (can be repeated, an optimization would be to ensure that the name column is unique)
router.post('/', async (req, res) => {
  const userRepository = getConnection().getRepository(User);

  const user = new User();
  user.name = req.body.name;

  res.send(await userRepository.save(user));
});

// Get game by name. `name` is a required query parameter
router.get('/user', async (req, res) => {
  const userRepository = getConnection().getRepository(User); // you can also get it via getConnection().getRepository() or getManager().getRepository()

  const user = await userRepository.findOne({
    where: {
      name: req.query.name,
    },
    relations: ['wins', 'wins.loser', 'losses', 'losses.winner'],
  });

  if (!user) {
    return res.send('No User!');
  }

  res.json({
    user,
    wins: {
      total: user.wins.length,
      games: user.wins,
    },
    losses: {
      total: user.losses.length,
      games: user.losses,
    },
  });
});

export default router;
