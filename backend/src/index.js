import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import user from "./routes/user.js";

dotenv.config();

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.use("/", user(prisma));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Currently listen on port ${PORT}`);
});
