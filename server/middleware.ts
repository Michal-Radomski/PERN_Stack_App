import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

interface CustomRequest extends Request {
  user?: Object;
}

export const checkAuth = (req: CustomRequest, res: Response, next: NextFunction) => {
  //* V1 Get token from header
  // const jwtToken = req.header("jwtToken");
  //* V2 Get token from cookies
  const jwtToken = req.cookies.jwtToken;

  // Check if not token
  if (!jwtToken) {
    return res.status(403).json({ message: "Not authorized, token not available" });
  }

  // Verify token
  try {
    const verify = jwt.verify(jwtToken, process.env.jwtSecret as string) as jwt.JwtPayload;
    // console.log({ verify });
    req.user = verify;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid", error: error });
  }
};

// This middleware will continue on if the token is in cookie
export const authorize = function (req: CustomRequest, res: Response, next: NextFunction) {
  // Get token from cookie
  const jwtToken = req.cookies.jwtToken;
  // console.log("jwtToken:", jwtToken);

  // Check if not token
  if (!jwtToken) {
    return res.status(403).json({ message: "Authorization denied", color: "warning" });
  }

  // Verify token
  try {
    // It is going to give use the user id (user:{id: user.id})
    const verify = jwt.verify(jwtToken, process.env.jwtSecret as string) as jwt.JwtPayload;
    // console.log({ verify });
    req.user = verify;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid", error: error });
  }
};
