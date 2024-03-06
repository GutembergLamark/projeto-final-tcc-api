import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IUserRequest } from "../../interfaces";
import { hash } from "bcrypt";

const createUserService = async ({
  username,
  email,
  password,
  cpf,
}: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);

  const emailAlreadyExists = await userRepository.findOneBy({ email });

  if (emailAlreadyExists) {
    throw new AppError("Email already exists", 400);
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
