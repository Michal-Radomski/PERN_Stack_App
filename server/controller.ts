import { Request, RequestHandler, Response } from "express";
// import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import pool from "./psql";

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
      return res.status(401).json("User already exist!");
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
    res.status(500).send("Server error" + error);
  }
};

// Test controller
export const getTestRoute: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  await console.log("req.ip:", req.ip);
  await res.send("<h1 style='color:blue;text-align:center'>API is running</h1>");
};
