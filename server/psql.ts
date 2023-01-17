import * as dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: process.env.database,
  user: process.env.user,
  password: process.env.password,
});

export default pool;

export const connectDb = async () => {
  try {
    await pool.connect();
    // const res = await pool.query("SELECT * FROM users");
    await console.log({ pool });
    await pool.end();
  } catch (error) {
    console.log({ error });
  }
};
