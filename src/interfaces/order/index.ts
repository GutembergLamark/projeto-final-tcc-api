import { IBook } from "../book";

export interface IOrderRequest {
  days: number | undefined;
  userId: string;
  bookId: string;
}

export interface IOrder {
  id: string;
  days: number;
  created_at: Date;
  book: IBook;
}
