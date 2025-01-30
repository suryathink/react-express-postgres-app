import { Express } from "express";
import user from "./authRoutes";
import todo from "./taskRoutes";

export const v1Apis = function (app: Express) {
  app.use("/api/v1/user", user);
  app.use("/api/v1/todo", todo);
};
