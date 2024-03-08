import { Request, Response } from "express";
import { IBookUpdate } from "../../interfaces";
import updateBookService from "../../services/books/updateBook.service";

const updateBookController = async (req: Request, res: Response) => {
  const data: IBookUpdate = req.body;
  const bookId = req.params.id;

  const updatedBook = await updateBookService(data, bookId);

  res.status(200).json({ updatedBook });
};

export default updateBookController;
