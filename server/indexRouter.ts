import express, { Router } from "express";

import { getTestRoute, register } from "./controller";

const indexRouter: Router = express.Router();

indexRouter.post("/register", register);

// Test route
indexRouter.get("/test", getTestRoute);

export default indexRouter;
