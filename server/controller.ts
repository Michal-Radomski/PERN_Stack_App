import { Request, RequestHandler, Response } from "express";

// Test controller
export const getTestRoute: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  await console.log("req.ip:", req.ip);
  await res.send("<h1 style='color:blue;text-align:center'>API is running</h1>");
};
