import { Request, Response } from "express";
import listBooksOfProfileService from "../../services/users/listBooksOfProfile.service";

const listBooksOfProfileController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const books = await listBooksOfProfileService(id);

  res.status(200).json({ books });
};

export default listBooksOfProfileController;
