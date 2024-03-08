import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IUserRequest } from "../../interfaces";
import { hash } from "bcrypt";
import "dotenv/config";

const createUserService = async ({
  username,
  email,
  password,
  cpf,
}: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);

  const emailAlreadyExists = await userRepository.findOneBy({ email });
  const cpfAlreadyExists = await userRepository.findOneBy({ cpf });

  if (emailAlreadyExists && email !== process.env.ADMIN_EMAIL) {
    throw new AppError("Email already exists", 400);
  }

  if (cpfAlreadyExists && cpf !== "000.000.000-00") {
    throw new AppError("CPF already exists", 400);
  }

  if (
    email === process.env.ADMIN_EMAIL ||
    username === process.env.ADMIN_USER
  ) {
    throw new AppError("You do not have permission to create this user", 401);
  }

  const user = userRepository.create({
    username,
    email,
    password: await hash(password!, 10),
    cpf,
  });

  await userRepository.save(user);

  return user;
};

export default createUserService;
