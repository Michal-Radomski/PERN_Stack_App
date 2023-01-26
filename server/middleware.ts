import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

interface CustomRequest extends Request {
  user?: Object;
}

export const checkAuth = (req: CustomRequest, res: Response, next: NextFunction) => {
  // Get token from header
  // const jwtToken = req.header("jwtToken");
  // Get token from cookies
  const jwtToken = req.cookies.jwtToken;

  // Check if not token
  if (!jwtToken) {
    return res.status(403).json({ msg: "Not authorized, token not available" });
  }

  // Verify token
  try {
    const verify = jwt.verify(jwtToken, process.env.jwtSecret as string) as jwt.JwtPayload;
    // console.log({ verify });

    req.user = verify.user;
    console.log("req.user:", req.user);
    console.log("verify.user:", verify.user);
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid", error: error });
  }
};