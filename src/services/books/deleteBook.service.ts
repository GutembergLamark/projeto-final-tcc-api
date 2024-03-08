import AppDataSource from "../../data-source";
import { Book } from "../../entities/book.entity";
import { AppError } from "../../errors/appError";

const deleteBookService = async (id: string) => {
  const bookRepository = AppDataSource.getRepository(Book);

  const book = await bookRepository.findOneBy({ id });

  if (!book) {
    throw new AppError("Book not found", 404);
  }

  await bookRepository.delete(id);

  return true;
};

export default deleteBookService;
