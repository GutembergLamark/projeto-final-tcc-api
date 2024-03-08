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

  const adminAlreadyExists = await userRepository.findOneBy({
    email: process.env.ADMIN_EMAIL,
  });
  const emailAlreadyExists = await userRepository.findOneBy({ email });
  const cpfAlreadyExists = await userRepository.findOneBy({ cpf });

  if (emailAlreadyExists && email !== process.env.ADMIN_EMAIL) {
    throw new AppError("Email already exists", 400);
  }

  if (cpfAlreadyExists && cpf !== "000.000.000-00") {
    throw new AppError("CPF already exists", 400);
  }

  if (
    (adminAlreadyExists && email === process.env.ADMIN_EMAIL) ||
    email === process.env.ADMIN_EMAIL
  ) {
    throw new AppError("You do not have permission to create this user", 401);
  }

  const user = userRepository.create({
    username,
    email,
    password: await hash(password!, 10),
    cpf,
  });

  if (!adminAlreadyExists) {
    const admin = userRepository.create({
      username: process.env.ADMIN_USER,
      email: process.env.ADMIN_EMAIL,
      password: await hash(process.env.ADMIN_PWD as string, 10),
      cpf: "000.000.000-00",
    });

    await userRepository.save(admin);
  }

  await userRepository.save(user);

  return user;
};

export default createUserService;
