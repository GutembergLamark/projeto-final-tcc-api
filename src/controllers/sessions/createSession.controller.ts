import { Request, Response } from "express";
import { ISessionRequest } from "../../interfaces";
import createSessionService from "../../services/sessions/createSession.service";

const createSessionController = async (req: Request, res: Response) => {
  const { email, password }: ISessionRequest =
    req.validatedBody as ISessionRequest;

  const token = await createSessionService({ email, password });

  return res.status(200).json({ token });
};

export default createSessionController;
