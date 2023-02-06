import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

interface CustomRequest extends Request {
  token?: string;
  user?: Object;
}

export const checkAuth = (req: CustomRequest, res: Response, next: NextFunction) => {
  //* V1 Get token from header
  // const jwtToken = req.header("jwtToken");
  //* V2 Get token from cookies
  const jwtToken = req.cookies.jwtToken;
  // console.log("jwtToken:", jwtToken)

  // Check if not token
  if (!jwtToken) {
    return res.status(403).json({ message: "Not authorized, token not available", color: "warning" });
  }

  // Verify token
  try {
    const verify = jwt.verify(jwtToken, process.env.jwtSecret as string) as jwt.JwtPayload;
    // console.log({ verify });
    req.user = verify;
    req.token = jwtToken;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid", error: error });
  }
};
