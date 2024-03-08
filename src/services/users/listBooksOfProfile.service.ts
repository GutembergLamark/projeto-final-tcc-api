import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IBookRequest } from "../../interfaces";

const listBooksOfProfileService = async (
  id: string
): Promise<IBookRequest[]> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id });

  const books = user?.orders.map((order) => {
    return order.book;
  });

  if (!books) {
    throw new AppError("You don't have books", 400);
  }

  return books;
};

export default listBooksOfProfileService;
