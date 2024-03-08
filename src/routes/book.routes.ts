import { Router } from "express";

import createBookController from "../controllers/books/createBook.controller";
import listBooksController from "../controllers/books/listBooks.controller";
import updateBookController from "../controllers/books/updateBook.controller";
import deleteBookController from "../controllers/books/deleteBook.controller";

import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";
import validateRequestMiddleware from "../middlewares/validateRequest.middleware";

import { createBookSchema } from "../serializers";

const routes = Router();

export const bookRoutes = () => {
  routes.post(
    "",
    ensureAuthMiddleware,
    ensureIsAdmMiddleware,
    validateRequestMiddleware(createBookSchema),
    createBookController
  );

  routes.get("", listBooksController);

  routes.patch(
    "/:id",
    ensureAuthMiddleware,
    ensureIsAdmMiddleware,
    updateBookController
  );

  routes.delete(
    "/:id",
    ensureAuthMiddleware,
    ensureIsAdmMiddleware,
    deleteBookController
  );

  return routes;
};
