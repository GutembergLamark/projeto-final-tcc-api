import { Request, Response } from "express";
import createOrderService from "../../services/orders/createOrder.service";
import { IOrderRequest } from "../../interfaces";

const createOrderController = async (req: Request, res: Response) => {
  const { days, userId, bookId } = req.validatedBody as IOrderRequest;

  const order = await createOrderService({ days, userId, bookId });

  return res.status(201).json({ order });
};

export default createOrderController;
