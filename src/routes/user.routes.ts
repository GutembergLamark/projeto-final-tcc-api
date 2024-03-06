import { Router } from "express";

import createUserController from "../controllers/users/createUser.controller";

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

  return routes;
};
