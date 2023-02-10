import { NextFunction, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

import { CustomRequest } from "./controllers/authController";

export const checkAuth: RequestHandler = (req: CustomRequest, res: Response, next: NextFunction): object | undefined => {
  //* V1 Get token from header
  // const jwtToken = req.header("jwtToken");
  //* V2 Get token from cookies
  const jwtToken = req.cookies.jwtToken;
  // console.log("jwtToken:", jwtToken)
  const refreshToken = req.cookies.refreshToken;
  // console.log("refreshToken:", refreshToken);

  // Check if not token
  if (!jwtToken) {
    return res.status(403).json({ message: "Not authorized, token not available", color: "warning" });
  }
  if (!refreshToken) {
    return res.status(403).json({ message: "Not authorized, token not available", color: "warning" });
  }

  // Verify token
  try {
    const verify = jwt.verify(jwtToken, process.env.jwtSecret as string) as jwt.JwtPayload;
    // console.log({ verify });
    req.user = verify;
    req.token = jwtToken;
    req.refreshToken = refreshToken;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid", error: error });
  }
};
