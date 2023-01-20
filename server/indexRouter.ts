import express, { Router } from "express";

import {
  // getTestRoute,
  login,
  logout,
  register,
} from "./controller";

const indexRouter: Router = express.Router();

indexRouter.post("/register", register);

indexRouter.post("/login", login);

indexRouter.get("/logout", logout);

// // Test route
// indexRouter.get("/test", getTestRoute);

export default indexRouter;
