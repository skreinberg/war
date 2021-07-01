import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
  Index,
} from 'typeorm';
import { Game } from './Game';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => Game, (game) => game.winner)
  wins: Game[];

  @OneToMany((type) => Game, (game) => game.loser)
  losses: Game[];
}
