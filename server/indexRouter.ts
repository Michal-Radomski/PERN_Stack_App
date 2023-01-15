import express, { Router, Request, Response } from "express";

const indexRouter: Router = express.Router();

// Test route
indexRouter.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send("<h1 style='color:blue;text-align:center'>API is running</h1>");
});

export default indexRouter;
