import { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import jwt_decode from "jwt-decode";

import pool from "../psql";
import { validEmail, validPassword } from "../validator";

interface CustomObject extends Object {
  id?: string;
}

export interface CustomRequest extends Request {
  refreshToken?: string;
  token?: string;
  user?: CustomObject;
}

interface Token {
  email: string;
}

//* Auth
export const register: RequestHandler = async (req: Request, res: Response): Promise<Object | undefined> => {
  const { name, email, password, passwordConfirm } = req.body;

  if (!email || !password || !name || !passwordConfirm) {
    return res.status(400).json({
      message: "Please fill all the fields",
      color: "warning",
    });
  }

  if (!validPassword(password)) {
    return res.status(401).json({ message: "Password must contain at least one letter and one number", color: "warning" });
  }

  if (!validEmail(email)) {
    return res.status(401).json({ message: "Invalid email", color: "warning" });
  }

  if (password !== passwordConfirm) {
    return res.status(400).json({
      message: "Passwords do not match",
      color: "warning",
    });
  }

  if (password.length < 8 || passwordConfirm.length < 8) {
    return res.status(400).json({
      message: "Password is too short",
      color: "warning",
    });
  }

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
    // console.log({ user });

    if (user.rows.length > 0) {
      return res.status(401).json({ message: "User already exist!", color: "danger" });
    }

    const salt = await bcrypt.genSalt(12);
    const bcryptPassword = await bcrypt.hash(password, salt);
    // console.log({ salt, bcryptPassword });

    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );
    // console.log({ newUser });

    return res.status(201).json({
      message: "User registered",
      color: "success",
    });
  } catch (error) {
    console.error({ error });
    res.status(500).json({ message: "Server error" + error });
  }
};

export const login: RequestHandler = async (req: Request, res: Response): Promise<Object | undefined> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide an email and password",
      color: "warning",
    });
  }

  if (!validPassword(password)) {
    return res.status(401).json({ message: "Password must contain at least one letter and one number", color: "warning" });
  }

  if (!validEmail(email)) {
    return res.status(401).json({ message: "Invalid email", color: "warning" });
  }

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Invalid Credential - Unknown User" });
    }
    const validPassword: boolean = await bcrypt.compare(password, user.rows[0].user_password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Credential - Email or Password is incorrect", color: "danger" });
    }
    // console.log("user:", user);

    const id = user.rows[0].user_id;
    const name = user.rows[0].user_name;

    const jwtToken = await jwt.sign({ id, name, email }, process.env.jwtSecret as string, {
      expiresIn: "1h",
    });
    const refreshToken = await jwt.sign({ id, name, email }, process.env.jwtRefreshSecret as string, {
      expiresIn: "24h",
    });

    //* V1 JSON
    // return res.status(200).json({ jwtToken });

    //* v2 Cookie
    const cookieOptions = {
      expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
      httpOnly: true,
    };
    const cookieOptions2 = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    // console.log({ cookieOptions, cookieOptions2 });

    res
      .status(200)
      .cookie("jwtToken", jwtToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions2)
      .json({ message: "You logged in successfully!", jwtToken, color: "success", refreshToken });
  } catch (error) {
    console.error({ error });
    res.status(500).json({ message: "Server error" + error });
  }
};

export const logout: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    await console.log("req.ip:", req.ip);
    // await res.cookie("jwtToken", "", { maxAge: 1 })
    await res.clearCookie("jwtToken");
    await res.clearCookie("refreshToken");
    await res.status(200).json({ message: "Logout Successfully", color: "success" });
  } catch (error) {
    console.error({ error });
    res.status(500).json({ message: "Server error" + error });
  }
};

//* Unnecessary - for testing only
// export const dashboard: RequestHandler = async (req: CustomRequest, res: Response): Promise<void> => {
//   await console.log("req.ip:", req.ip);
//   // await console.log("req.user:", req.user);
//   // await res.send("<h1 style='color:blue;text-align:center'>Protected Route</h1>");
//   await res.json({ message: "Protected Route" });
// };

// Verify
export const verifyToken: RequestHandler = (req: CustomRequest, res: Response): void => {
  // console.log("req.ip:", req.ip);
  // console.log("req.user:", req.user);

  try {
    // res.json({ message: "jwtToken: Ok" });
    res.json({
      message: "jwtToken and refreshToken: Ok",
      tokenUser: req.user,
      color: "primary",
      jwtToken: req.token,
      refreshToken: req.refreshToken,
    });
  } catch (error) {
    console.error({ error });
    res.status(500).send("Server error");
  }
};

// // Test controller
// export const getTestRoute: RequestHandler = async (req: Request, res: Response): Promise<void> => {
//   await console.log("req.ip:", req.ip);
//   await res.send("<h1 style='color:blue;text-align:center'>API is running</h1>");
// };

//* Refresh Access Token
export const refreshJWT_Token: RequestHandler = async (req: CustomRequest, res: Response): Promise<object | undefined> => {
  const refreshToken = req.cookies.refreshToken;
  // console.log("refreshToken:", refreshToken);

  // Check if not refreshToken
  if (!refreshToken) {
    return res.status(403).json({ message: "Not authorized, token not available", color: "warning" });
  }

  // Verify RefreshToken
  const verifyRefreshToken = jwt.verify(refreshToken, process.env.jwtRefreshSecret as string) as jwt.JwtPayload;
  // console.log({ verifyRefreshToken });

  if (!verifyRefreshToken) {
    return res.status(403).json({ message: "Could not refresh access token", color: "danger" });
  }

  try {
    const decodedRefreshToken = jwt_decode(refreshToken) as Token;
    const email = decodedRefreshToken.email;

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
    // console.log("user:", user);
    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Invalid Credential - Unknown User" });
    }

    // Sign a new access token
    const id = user.rows[0].user_id;
    const name = user.rows[0].user_name;

    const jwtToken = await jwt.sign({ id, name, email }, process.env.jwtSecret as string, {
      expiresIn: "1h",
    });
    const cookieOptions = {
      expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res
      .status(200)
      .cookie("jwtToken", jwtToken, cookieOptions)
      .json({ message: "Your access token is refreshed!", jwtToken, color: "info", refreshToken });
  } catch (error) {
    res.status(401).json({ message: "Token is not valid", error: error });
  }
};
