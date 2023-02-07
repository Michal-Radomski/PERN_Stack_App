import express, { Router } from "express";

import {
  dashboard,
  // getTestRoute,
  login,
  logout,
  register,
  verifyToken,
} from "./controllers/authController";
import { getUserList } from "./controllers/todoListController";
import { checkAuth } from "./middleware";

const indexRouter: Router = express.Router();

//* Auth
indexRouter.post("/register", register);

indexRouter.post("/login", login);

indexRouter.post("/logout", logout);

indexRouter.get("/dashboard", checkAuth, dashboard);

indexRouter.post("/verify", checkAuth, verifyToken);

//* Todo List
indexRouter.get("/dashboard/list", checkAuth, getUserList);

// // Test route
// indexRouter.get("/test", getTestRoute);

export default indexRouter;
