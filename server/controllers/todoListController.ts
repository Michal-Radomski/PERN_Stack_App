import { Request, RequestHandler, Response } from "express";

import pool from "../psql";

interface CustomRequest extends Request {
  token?: string;
  user?: { id: string };
}

//* ToDo List
export const getList: RequestHandler = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const user = await pool.query(
      "SELECT u.user_name, t.todo_id, t.description FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1",
      [req.user!.id]
    );
    res.status(200).json(user.rows);
  } catch (error) {
    console.error({ error });
    res.status(500).send("Server error");
  }
};
