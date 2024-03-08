import { Router } from "express";

import createUserController from "../controllers/users/createUser.controller";
import deleteUserController from "../controllers/users/deleteUser.controller";
import listBooksOfProfileController from "../controllers/users/listBooksOfProfile.controller";

import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import validateRequestMiddleware from "../middlewares/validateRequest.middleware";

import { createUserSchema } from "../serializers";

const routes = Router();

export const userRoutes = () => {
  routes.post(
    "",
    validateRequestMiddleware(createUserSchema),
    createUserController
  );

  routes.delete("/:id", ensureAuthMiddleware, deleteUserController);

  routes.get("/orders/:id", ensureAuthMiddleware, listBooksOfProfileController);

  return routes;
};
