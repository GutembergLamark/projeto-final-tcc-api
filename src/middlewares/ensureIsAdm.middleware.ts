import { NextFunction, Request, Response } from "express";
import "dotenv/config";

const ensureIsAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;

  if (user.email !== process.env.ADMIN_EMAIL) {
    return res.status(403).json({
      message: "User is not admin",
    });
  }

  return next();
};

export default ensureIsAdmMiddleware;
