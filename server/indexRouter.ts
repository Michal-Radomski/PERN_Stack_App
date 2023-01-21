import express, { Router } from "express";

import {
  dashboard,
  // getTestRoute,
  login,
  logout,
  register,
} from "./controller";
import { checkAuth } from "./middleware";

const indexRouter: Router = express.Router();

indexRouter.post("/register", register);

indexRouter.post("/login", login);

indexRouter.post("/logout", logout);

indexRouter.get("/dashboard", checkAuth, dashboard);

// // Test route
// indexRouter.get("/test", getTestRoute);

export default indexRouter;
