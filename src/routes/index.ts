import { Express } from "express";
import { sessionRoutes } from "./session.routes";
import { userRoutes } from "./user.routes";
import { bookRoutes } from "./book.routes";
import { orderRoutes } from "./order.routes";

const appRoutes = (app: Express) => {
  app.use("/users", userRoutes());
  app.use("/login", sessionRoutes());
  app.use("/books", bookRoutes());
  app.use("/orders", orderRoutes());
};

export default appRoutes;
