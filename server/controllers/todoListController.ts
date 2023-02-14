import { Request, RequestHandler, Response } from "express";

import pool from "../psql";

interface CustomRequest extends Request {
  token?: string;
  user?: { id: string };
}

//* ToDo List
// Get All Todos
export const getWholeList: RequestHandler = async (req: CustomRequest, res: Response): Promise<void> => {
  console.log("req.ip:", req.ip);
  try {
    const list = await pool.query(
      "select u.user_name, u.user_email, t.todo_id, t.description, t.created_at, t.updated_at from users as u join todos as t on t.user_id = u.user_id"
    );
    res.status(200).json({ list: list.rows, message: "200, All todos list is ok", color: "info" });
  } catch (error) {
    console.error({ error });
    res.status(500).send("Server error");
  }
};

// Get User's Todos
export const getUserList: RequestHandler = async (req: CustomRequest, res: Response): Promise<void> => {
  // console.log("req.user:", req.user);
  // console.log("req.user!.id:", req.user!.id);
  try {
    const userList = await pool.query(
      "select u.user_name, u.user_email, t.todo_id, t.description, t.created_at, t.updated_at from users as u left join todos as t on t.user_id = u.user_id where u.user_id = $1",
      [req.user!.id]
    );
    res.status(200).json({ list: userList.rows, message: "200, Your todo list is ok", color: "info" });
  } catch (error) {
    console.error({ error });
    res.status(500).send("Server error");
  }
};

// Create a todo
export const createTodo: RequestHandler = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    // console.log("req.user:", req.user);
    // console.log("req.body:", req.body);
    const { description } = req.body;
    const newTodo = await pool.query("INSERT INTO todos (user_id, description) VALUES ($1, $2) RETURNING *", [
      req.user!.id,
      description,
    ]);
    res.status(201).json({
      answerPSQL: newTodo.rows[0],
      message: `201, Todo id: ${newTodo.rows[0]?.todo_id} successfully created`,
      color: "success",
    });
  } catch (error) {
    console.error({ error });
  }
};

// Update a todo
export const updateTodo = async (req: CustomRequest, res: Response): Promise<object | undefined> => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    // console.log({ id, description });
    const updateTodo = await pool.query(
      "UPDATE todos SET description = $1, updated_at = CURRENT_TIMESTAMP WHERE todo_id = $2 AND user_id = $3 RETURNING *",
      [description, id, req.user!.id]
    );
    // console.log("updateTodo.rows:", updateTodo.rows);

    if (updateTodo.rows.length === 0) {
      return res.status(403).json({ message: "403, This todo is not yours", color: "danger" });
    }
    res.status(200).json({ message: `200, Todo id: ${id} was updated`, color: "success" });
  } catch (error) {
    console.error({ error });
  }
};

// Delete a todo
export const deleteTodo = async (req: CustomRequest, res: Response): Promise<object | undefined> => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *", [
      id,
      req.user!.id,
    ]);
    if (deleteTodo.rows.length === 0) {
      return res.status(403).json({ message: "403, This todo is not yours", color: "danger" });
    }
    res.status(200).json({ message: `200, Todo id: ${id} was deleted`, color: "warning" });
  } catch (error) {
    console.error({ error });
  }
};
