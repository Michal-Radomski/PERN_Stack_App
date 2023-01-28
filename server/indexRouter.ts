import express, { Router } from "express";

import {
  dashboard,
  // getTestRoute,
  login,
  logout,
  register,
  verifyToken,
} from "./controller";
import { authorize, checkAuth } from "./middleware";

const indexRouter: Router = express.Router();

indexRouter.post("/register", register);

indexRouter.post("/login", login);

indexRouter.post("/logout", logout);

indexRouter.get("/dashboard", checkAuth, dashboard);

// Verify
indexRouter.post("/verify", authorize, verifyToken);

// // Test route
// indexRouter.get("/test", getTestRoute);

export default indexRouter;
