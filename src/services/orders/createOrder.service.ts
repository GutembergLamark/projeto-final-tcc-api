import AppDataSource from "../../data-source";
import { Book } from "../../entities/book.entity";
import { Order } from "../../entities/order.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IOrderRequest } from "../../interfaces";
import moment, { Moment } from "moment";
import { CronJob } from "cron";

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

  if (!book) {
    throw new AppError("Book not found", 404);
  }

  if (!book?.available) {
    throw new AppError("This book is not available", 403);
  }

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const order = orderRepository.create({
    days,
    created_at: new Date(),
    user: { id: user?.id },
    book: { id: book.id },
  });

  const expirationDate = moment().add(days, "minutes");

  if (order && book) {
    await bookRepository.update(bookId, {
      available: false,
    });
  }

  await orderRepository.save(order);
  scheduleExpirationDelete(order, book, expirationDate);

  return order;
};

export default createOrderService;

async function deleteExpiredOrder(orderId: string, bookId: string) {
  const orderRepository = AppDataSource.getRepository(Order);
  const order = await orderRepository.findOneBy({ id: orderId });
  const bookRepository = AppDataSource.getRepository(Book);
  const book = await bookRepository.findOneBy({ id: bookId });

  if (order && book) {
    await orderRepository.delete(order);
    await bookRepository.update(bookId, {
      available: true,
    });
  }
}

function scheduleExpirationDelete(
  order: Order,
  book: Book,
  expirationDate: Moment
) {
  const cron = new CronJob(`${expirationDate.minute()} * * * *`, () =>
    deleteExpiredOrder(order.id, book.id)
  );
  cron.start();
}
