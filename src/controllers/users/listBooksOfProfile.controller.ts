import { Request, Response } from "express";
import listOrdersOfProfileService from "../../services/users/listOrdersOfProfile.service";

const listOrdersOfProfileController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const orders = await listOrdersOfProfileService(id);

  res.status(200).json({ orders });
};

export default listOrdersOfProfileController;
