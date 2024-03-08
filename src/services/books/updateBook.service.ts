import AppDataSource from "../../data-source";
import { Book } from "../../entities/book.entity";
import { AppError } from "../../errors/appError";
import { IBookUpdate } from "../../interfaces";

const updateBookService = async (
  data: IBookUpdate,
  bookId: string
): Promise<Book> => {
  const keys = Object.keys(data);

  if (keys.includes("id")) {
    throw new AppError("Unable to update id", 401);
  }

  const bookRepository = AppDataSource.getRepository(Book);

  const book = await bookRepository.findOneBy({ id: bookId });

  if (!book) throw new AppError("Book not exists", 404);

  const { title, author, published_date, synopsis, pages } = data;

  book &&
    (await bookRepository.update(bookId, {
      title: title ? title : book.title,
      author: author ? author : book.author,
      published_date: published_date ? published_date : book.published_date,
      synopsis: synopsis ? synopsis : book.synopsis,
      pages: pages ? pages : book.pages,
    }));

  const updatedUser = await bookRepository.findOneBy({ id: bookId });

  return updatedUser!;
};

export default updateBookService;
