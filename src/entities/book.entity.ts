import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("books")
export class Book {
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  title: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  author: string;

  @Column({ type: "date", nullable: false })
  published_date: Date;

  @Column({ type: "varchar", length: 200, nullable: false })
  synopsis: string;

  @Column({ type: "int", nullable: false })
  pages: number;

  @Column({ type: "boolean", nullable: false })
  available: boolean;
}
