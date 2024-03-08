import { Request, Response } from "express";

import createBookService from "../../services/books/createBook.service";

import { IBookRequest } from "../../interfaces";

const createBookController = async (req: Request, res: Response) => {
  const { title, author, published_date, synopsis, pages } =
    req.validatedBody as IBookRequest;

  const book = await createBookService({
    title,
    author,
    published_date,
    synopsis,
    pages,
  });

  return res.status(201).json({ book });
};

export default createBookController;
