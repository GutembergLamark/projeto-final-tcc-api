import AppDataSource from "../../data-source";

import { ISessionRequest } from "../../interfaces";

import { User } from "../../entities/user.entity";

import { AppError } from "../../errors/appError";

import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";

import "dotenv/config";

const createSessionService = async ({
  email,
  password,
}: ISessionRequest): Promise<string> => {
  const userRespository = AppDataSource.getRepository(User);

  const user = await userRespository.findOneBy({ email: email });

  if (!user) {
    throw new AppError("Invalid user or password", 403);
  }

  const passwordMatch = compareSync(password, user.password!);

  if (!passwordMatch) {
    throw new AppError("Invalid user or password", 403);
  }

  const token = jwt.sign(
    { email: user.email },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: user.id,
    }
  );

  return token;
};

export default createSessionService;
