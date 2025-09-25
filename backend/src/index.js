import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import user from "./routes/user.js";
import dashboard from "./routes/dashboard.js";
import payments from "./routes/payments.js";
import authMiddleware from "./middleware/authMiddleware.js";
import transaction from "./routes/transaction.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const prisma = new PrismaClient();

app.use(cors());

app.use("/", user(prisma));
app.use("/dashboard", authMiddleware, dashboard(prisma));
app.use("/api", authMiddleware, payments(prisma));
app.use("/transaction", authMiddleware, transaction(prisma));

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Currently listen on port ${PORT}`);
});
