import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Book } from "./book.entity";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string;

  @Column({ nullable: false })
  days: number;

  @Column()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @OneToOne(() => Book, { eager: true })
  @JoinColumn()
  book: Book;
}
