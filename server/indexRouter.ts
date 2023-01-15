import express, { Router } from "express";

import { getTestRoute } from "./controller";

const indexRouter: Router = express.Router();

// Test route
indexRouter.get("/test", getTestRoute);

export default indexRouter;
