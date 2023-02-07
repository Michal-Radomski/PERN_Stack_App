import { Request, RequestHandler, Response } from "express";

import pool from "../psql";

interface CustomRequest extends Request {
  token?: string;
  user?: { id: string };
}

//* ToDo List
export const getUserList: RequestHandler = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const user = await pool.query(
      "select u.user_name, u.user_email, t.todo_id, t.description, t.created_at, t.updated_at from users as u join todos as t on t.user_id = u.user_id where u.user_id = $1",
      [req.user!.id]
    );
    res.status(200).json(user.rows);
  } catch (error) {
    console.error({ error });
    res.status(500).send("Server error");
  }
};
