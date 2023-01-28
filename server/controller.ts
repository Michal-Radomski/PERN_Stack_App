import { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import pool from "./psql";

interface CustomRequest extends Request {
  user?: Object;
}

export const register: RequestHandler = async (req: Request, res: Response): Promise<Object | undefined> => {
  const { name, email, password, passwordConfirm } = req.body;

  if (!email || !password || !name || !passwordConfirm) {
    return res.status(400).json({
      message: "Please fill all the fields",
    });
  }

  if (password !== passwordConfirm) {
    return res.status(400).json({
      message: "Passwords do not match",
    });
  }

  if (password.length < 8 || passwordConfirm.length < 8) {
    return res.status(400).json({
      message: "Password is too short",
    });
  }

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
    // console.log({ user });

    if (user.rows.length > 0) {
      return res.status(401).json({ message: "User already exist!" });
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
    });
  }

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Invalid Credential - Unknown User" });
    }
    const validPassword: boolean = await bcrypt.compare(password, user.rows[0].user_password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Credential - Email or Password is incorrect" });
    }
    // console.log("user:", user);

    const id = user.rows[0].user_id;
    const name = user.rows[0].user_name;

    const jwtToken = await jwt.sign({ id, name, email }, process.env.jwtSecret as string, {
      expiresIn: "1h",
    });

    //* V1 JSON
    // return res.status(200).json({ jwtToken });

    //* v2 Cookie
    const cookieOptions = {
      expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
      httpOnly: true,
    };
    // console.log({ cookieOptions });

    res.status(200).cookie("jwtToken", jwtToken, cookieOptions).json({ message: "You logged in successfully!", jwtToken });
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
    await res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    console.error({ error });
    res.status(500).json({ message: "Server error" + error });
  }
};

export const dashboard: RequestHandler = async (req: CustomRequest, res: Response): Promise<void> => {
  await console.log("req.ip:", req.ip);
  // await console.log("req.user:", req.user);
  // await res.send("<h1 style='color:blue;text-align:center'>Protected Route</h1>");
  await res.json({ message: "Protected Route" });
};

// Verify
export const verifyToken: RequestHandler = async (req: CustomRequest, res: Response): Promise<void> => {
  // await console.log("req.ip:", req.ip);
  // await console.log("req.user:", req.user);

  try {
    // res.json({ message: "jwtToken: Ok" });
    res.json({ message: req.user });
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
