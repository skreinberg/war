import { app } from '../setup';
import * as supertest from 'supertest';

const deck1 = [
  { name: '5', value: 5, suit: 'club' },
  { name: '10', value: 10, suit: 'heart' },
  { name: '6', value: 6, suit: 'heart' },
  { name: 'Queen', value: 12, suit: 'diamond' },
  { name: '7', value: 7, suit: 'club' },
  { name: 'King', value: 13, suit: 'diamond' },
  { name: '3', value: 3, suit: 'spade' },
  { name: '3', value: 3, suit: 'club' },
  { name: '3', value: 3, suit: 'diamond' },
  { name: 'Ace', value: 14, suit: 'heart' },
  { name: '4', value: 4, suit: 'heart' },
  { name: '4', value: 4, suit: 'club' },
  { name: '10', value: 10, suit: 'diamond' },
  { name: 'Queen', value: 12, suit: 'club' },
  { name: '9', value: 9, suit: 'diamond' },
  { name: 'Ace', value: 14, suit: 'spade' },
  { name: '2', value: 2, suit: 'club' },
  { name: '9', value: 9, suit: 'spade' },
  { name: 'Ace', value: 14, suit: 'club' },
  { name: 'Jack', value: 11, suit: 'club' },
  { name: '10', value: 10, suit: 'spade' },
  { name: '7', value: 7, suit: 'diamond' },
  { name: 'Jack', value: 11, suit: 'spade' },
  { name: '7', value: 7, suit: 'heart' },
  { name: '5', value: 5, suit: 'diamond' },
  { name: '4', value: 4, suit: 'spade' },
];

const deck2 = [
  { name: '2', value: 2, suit: 'diamond' },
  { name: '6', value: 6, suit: 'diamond' },
  { name: '8', value: 8, suit: 'diamond' },
  { name: 'Jack', value: 11, suit: 'heart' },
  { name: 'King', value: 13, suit: 'club' },
  { name: 'King', value: 13, suit: 'heart' },
  { name: '3', value: 3, suit: 'heart' },
  { name: '10', value: 10, suit: 'club' },
  { name: 'Queen', value: 12, suit: 'heart' },
  { name: '8', value: 8, suit: 'heart' },
  { name: '5', value: 5, suit: 'heart' },
  { name: 'Jack', value: 11, suit: 'diamond' },
  { name: '9', value: 9, suit: 'heart' },
  { name: '4', value: 4, suit: 'diamond' },
  { name: 'Ace', value: 14, suit: 'diamond' },
  { name: '7', value: 7, suit: 'spade' },
  { name: '9', value: 9, suit: 'club' },
  { name: '6', value: 6, suit: 'club' },
  { name: '5', value: 5, suit: 'spade' },
  { name: 'King', value: 13, suit: 'spade' },
  { name: '2', value: 2, suit: 'heart' },
  { name: 'Queen', value: 12, suit: 'spade' },
  { name: '6', value: 6, suit: 'spade' },
  { name: '8', value: 8, suit: 'spade' },
  { name: '8', value: 8, suit: 'club' },
  { name: '2', value: 2, suit: 'spade' },
];

test('GET /deal', async () => {
  await supertest(app)
    .get('/api/game/deal')
    .expect(200)
    .then((response) => {
      expect(response.body.length).toEqual(2);
      expect(response.body[0].length + response.body[1].length).toEqual(52);
    });
});

test('POST /game', async () => {
  await supertest(app)
    .post('/api/game/play')
    .send({ player1: 'Player 1', deck1, player2: 'Player 2', deck2 })
    .expect(200)
    .then((response) => {
      expect(response.body.winner.name).toEqual('Player 1');
      expect(response.body.loser.name).toEqual('Player 2');
      expect(JSON.parse(response.body.moves).length).toEqual(200);
    });
});
