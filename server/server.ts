// Todo: add compression: https://www.npmjs.com/package/compression
// Todo: change name convention to: kebab-case eg: kebab-case.ts
// Todo: add pepper - example below?

import http from "http";

import * as dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";

// Import routes
import indexRouter from "./indexRouter";
// Import DB connection/ pool
import pool from "./psql";
// import { connectDb } from "./psql";

// The server
const app: Express = express();

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
  })
);

//Route middleware
app.use("/api", indexRouter);

// // Test route
// app.get("/", (req: Request, res: Response) => {
//   console.log("req.ip:", req.ip);
//   res.send("<h1 style='color:blue;text-align:center'>API is running</h1>");
// });

// Port
const port = (process.env.PORT || 5000) as number;

//* PostgresQL DB
// connectDb();
pool
  .connect()
  .then(() => {
    console.log("Connected to the PostgreSQL DB successfully...");
  })
  .catch((error) => console.error({ error }));

const server = http.createServer(app);
server.listen({ port: port }, (): void => {
  console.log(`🚀 Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});

//* Generate JWT secret string
// const JWT_Secret = require("crypto").randomBytes(48).toString("hex");
// console.log({ JWT_Secret }, JWT_Secret.length);

//* Generate JWT secret string - v2
// openssl rand -hex 64

//* Bcrypt + Pepper example
// import bcrypt from "bcrypt";
// // Secret pepper value (should be stored securely)
// const pepper = process.env.PEPPER || "super-secret"; // e.g., 'mySecretPepperValue'

// // Function to hash the password
// async function hashPassword(password: string): Promise<{
//   hashedPassword: string;
//   salt: string;
// }> {
//   // Generate a unique salt
//   const salt: string = await bcrypt.genSalt(12); // You can adjust the salt rounds
//   // Combine the password with the pepper
//   const combined: string = password + pepper;
//   // Hash the combined value with the salt
//   const hashedPassword: string = await bcrypt.hash(combined, salt);
//   return { hashedPassword, salt }; // Return both hashed password and salt
// }

// // Function to verify the password
// async function verifyPassword(storedHash: string, passwordToCheck: string): Promise<boolean> {
//   // Combine the password to check with the pepper
//   const combinedToCheck: string = passwordToCheck + pepper;
//   // Verify the combined password against the stored hash
//   const match: boolean = await bcrypt.compare(combinedToCheck, storedHash);
//   return match; // Returns true if passwords match, false otherwise
// }

// // Example usage
// (async (): Promise<void> => {
//   const password = "securePassword123";

//   // Hashing the password
//   const { hashedPassword } = await hashPassword(password);
//   console.log("Hashed Password:", hashedPassword);

//   // Verifying the password
//   const isMatch = await verifyPassword(hashedPassword, "securePassword123");
//   console.log("Password Match:", isMatch); // Outputs: true

//   const isWrongMatch = await verifyPassword(hashedPassword, "wrongPassword");
//   console.log("Wrong Password Match:", isWrongMatch); // Outputs: false
// })();
