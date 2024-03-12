import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

import { app, server } from "./socket/socket.js";
import connectToDB from "./utils/database.js";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// const app = express();

dotenv.config();

const corsOptions = {
  origin: true,
  credentials: true,
};

const port = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../frontend/dist")));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/users", userRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

const connect = async () => {
  try {
    server.listen(port, () => {
      connectToDB();
      console.log(`connected to mongodb & running on port ${port}`);
    });
  } catch (error) {
    console.log("error in server.js file: ", error);
  }
};

connect();
