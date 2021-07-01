import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.wins)
  @JoinColumn()
  winner: User;

  @ManyToOne((type) => User, (user) => user.losses)
  @JoinColumn()
  loser: User;

  @Column({ select: false })
  moves: string;
}
