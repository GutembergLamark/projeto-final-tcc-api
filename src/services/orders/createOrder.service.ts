import AppDataSource from "../../data-source";
import { Book } from "../../entities/book.entity";
import { Order } from "../../entities/order.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IOrderRequest } from "../../interfaces";

const createOrderService = async ({
  days,
  userId,
  bookId,
}: IOrderRequest): Promise<Order> => {
  const orderRepository = AppDataSource.getRepository(Order);
  const bookRepository = AppDataSource.getRepository(Book);
  const userRepository = AppDataSource.getRepository(User);

  const book = await bookRepository.findOneBy({ id: bookId });
  const user = await userRepository.findOneBy({ id: userId });

  if (!book?.available) {
    throw new AppError("This book is not available", 403);
  }

  const order = orderRepository.create({
    days,
    created_at: new Date(),
    user: { id: user?.id },
    book: { id: book.id },
  });

  if (order && book) {
    await bookRepository.update(bookId, {
      available: false,
    });
  }

  await orderRepository.save(order);

  return order;
};

export default createOrderService;
