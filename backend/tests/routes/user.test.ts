import { app } from '../setup';
import * as supertest from 'supertest';

test('GET /', async () => {
  await supertest(app)
    .get('/api/user')
    .expect(200)
    .then((response) => {
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });
});

test('POST /', async () => {
  await supertest(app)
    .post('/api/user')
    .send({ name: 'Test User 2' })
    .expect(200)
    .then((response) => {
      expect(response.body.name).toEqual('Test User 2');
    });
});

test('GET /user', async () => {
  await supertest(app)
    .get('/api/user/user')
    .query({ name: 'Test User 2' })
    .expect(200)
    .then((response) => {
      expect(response.body.user.name).toEqual('Test User 2');
    });
});
