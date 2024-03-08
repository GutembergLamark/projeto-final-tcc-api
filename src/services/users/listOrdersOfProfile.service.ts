import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IOrder } from "../../interfaces";

const listOrdersOfProfileService = async (
  id: string
): Promise<IOrder[] | []> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id });

  const orders = user?.orders;

  return orders!;
};

export default listOrdersOfProfileService;
