import express, { Router } from "express";

import {
  deleteUser,
  // dashboard,
  // getTestRoute,
  login,
  logout,
  refreshJWT_Token,
  register,
  verifyToken,
} from "./controllers/authController";
import { createTodo, deleteTodo, getUserList, getWholeList, updateTodo } from "./controllers/todoListController";
import { checkAuth } from "./middleware";

const indexRouter: Router = express.Router({ strict: false, caseSensitive: true });

//* Auth
indexRouter.post("/register", register);

indexRouter.post("/login", login);

indexRouter.post("/logout", logout);

indexRouter.post("/refresh", checkAuth, refreshJWT_Token);

indexRouter.delete("/delete/user", checkAuth, deleteUser);

//* Unnecessary - for testing only
// indexRouter.get("/dashboard", checkAuth, dashboard);

indexRouter.post("/verify", checkAuth, verifyToken);

//* Todo List
indexRouter.get("/dashboard/all-todos", checkAuth, getWholeList);

indexRouter.get("/dashboard/user-list", checkAuth, getUserList);

indexRouter.post("/todos", checkAuth, createTodo);

indexRouter.put("/todos/:id", checkAuth, updateTodo);

indexRouter.delete("/todos/:id", checkAuth, deleteTodo);

// // Test route
// indexRouter.get("/test", getTestRoute);

export default indexRouter;
