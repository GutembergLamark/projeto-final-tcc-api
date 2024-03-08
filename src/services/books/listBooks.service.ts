import AppDataSource from "../../data-source";
import { Book } from "../../entities/book.entity";
import { IBookRequest } from "../../interfaces";

const listBooksService = async (): Promise<IBookRequest[]> => {
  const bookRepository = AppDataSource.getRepository(Book);

  const books = bookRepository.find();

  return books;
};

export default listBooksService;
