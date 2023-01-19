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

// export const connectDb = async () => {
//   try {
//     await pool.connect().then(() => {
//       console.log("Connected to the DB successfully...");
//     });
//     const res = await pool.query("SELECT * FROM users");
//     // await console.log({ pool });
//     await console.log("res.rows:", res.rows);
//     await pool.end();
//   } catch (error) {
//     console.log({ error });
//   }
// };
