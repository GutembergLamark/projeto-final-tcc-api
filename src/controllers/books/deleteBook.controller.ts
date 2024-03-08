import { Request, Response } from "express";
import deleteBookService from "../../services/books/deleteBook.service";
const deleteBookController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedBook = await deleteBookService(id);

  return res.status(204).json();
};

export default deleteBookController;
