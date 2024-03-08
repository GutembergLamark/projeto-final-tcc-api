import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { Order } from "./order.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  username: string;

  @Column({ unique: true, type: "varchar", length: 50, nullable: false })
  email: string;

  @Column({ nullable: false })
  @Exclude()
  password?: string;

  @Column({ unique: true, type: "char", length: 14, nullable: false })
  cpf: string;

  @OneToMany(() => Order, (order) => order.user, { eager: true })
  orders: Order[];
}
