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

// connectDb();
pool
  .connect()
  .then(() => {
    console.log("Connected to the PostgreSQL DB successfully...");
  })
  .catch((error) => console.error({ error }));

const server = http.createServer(app);
server.listen({ port: port }, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});

//* Generate JWT secret string
// const JWT_Secret = require("crypto").randomBytes(48).toString("hex");
// console.log({ JWT_Secret }, JWT_Secret.length);
