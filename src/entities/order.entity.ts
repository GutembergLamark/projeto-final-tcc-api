import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Book } from "./book.entity";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string;

  @Column({ type: "date", nullable: false })
  time: string;

  @Column()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Book, (book) => book.id)
  book: Book;
}
