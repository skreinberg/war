import { createApp } from '../server';
import { createConnection, getConnection } from 'typeorm';
import { User, Game } from '../db/entities';

beforeAll(async () => {
  const connection = await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'postgres',
    entities: [User, Game],
    synchronize: true,
  });

  const userRepository = connection.getRepository(User);

  const user = userRepository.findOne({ where: { name: 'Test User' } });

  if (user) {
    return;
  } else {
    const testUser = new User();
    testUser.name = 'Test User';

    await userRepository.save(testUser);
  }
});

afterAll(async () => {
  const connection = getConnection();
  await connection.close();
});

export const app = createApp();
