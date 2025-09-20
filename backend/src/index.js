import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import user from "./routes/user.js";
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const prisma = new PrismaClient();

app.use(cors());

app.use("/", user(prisma));
app.get("/dashboard", authMiddleware, (req, res) => {
  res.json({
    message: `Welcome to the ${req.user.role} dashboard, your email is ${req.user.email}`,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Currently listen on port ${PORT}`);
});
