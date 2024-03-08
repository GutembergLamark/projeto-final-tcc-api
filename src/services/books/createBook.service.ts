import AppDataSource from "../../data-source";
import { Book } from "../../entities/book.entity";
import { AppError } from "../../errors/appError";
import { IBookRequest } from "../../interfaces";

const createBookService = async ({
  title,
  author,
  published_date,
  synopsis,
  pages,
}: IBookRequest) => {
  const bookRepository = AppDataSource.getRepository(Book);

  const bookAlreadyExists = await bookRepository.findOneBy({ title });

  if (bookAlreadyExists) {
    throw new AppError("Book already exists", 400);
  }

  const book = bookRepository.create({
    title,
    author,
    published_date,
    synopsis,
    pages,
    available: true,
  });

  await bookRepository.save(book);

  return book;
};

export default createBookService;
