require('dotenv').config()

import * as express from 'express';
import * as cors from 'cors';
import * as path from 'path';
import { createConnection, getConnection } from 'typeorm';

import game from './routes/game';
import user from './routes/user';
import {User, Game } from './db/entities';

export const createApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use('/api/game', game);
  app.use('/api/user', user);

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../frontend', 'build')));

    app.get('*', (req, res) => {
      res.sendFile(
        path.join(__dirname, '../../frontend', 'build', 'index.html')
      );
    });
  }

  return app;
};

const run = async () => {

  const connection = await createConnection({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'postgres',
    entities: [User, Game],
    synchronize: true,
  });

  const app = createApp();

  app
    .listen(process.env.PORT, () => {
      console.log('Server listening on port:', process.env.PORT);
    })
    .on('error', (e) => {
      console.log(e);
    });
};


run()