import { Router } from "express";
import createOrderController from "../controllers/orders/createOrder.controller";
import validateRequestMiddleware from "../middlewares/validateRequest.middleware";
import { createOrderSchema, createSessionSchema } from "../serializers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const routes = Router();

export const orderRoutes = () => {
  routes.post(
    "",
    ensureAuthMiddleware,
    validateRequestMiddleware(createOrderSchema),
    createOrderController
  );
  return routes;
};
