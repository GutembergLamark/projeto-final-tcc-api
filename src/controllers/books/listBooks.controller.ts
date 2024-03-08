import { Request, Response } from "express";
import listBooksService from "../../services/books/listBooks.service";

const listBooksController = async (req: Request, res: Response) => {
  const books = await listBooksService();

  res.status(200).json({ books });
};

export default listBooksController;
