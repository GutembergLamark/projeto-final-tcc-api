import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";

import createUserService from "../../services/users/createUser.service";

import { IUserRequest } from "../../interfaces";

const createUserController = async (req: Request, res: Response) => {
  const { username, email, password, cpf } = req.validatedBody as IUserRequest;

  const user = await createUserService({ username, email, password, cpf });

  delete user.password;

  return res.status(201).json(instanceToPlain({ user }));
};

export default createUserController;
