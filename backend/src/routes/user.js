import express from "express";
import bcrypt from "bcrypt";

export default function (prisma) {
  const router = express.Router();

  router.post("/signup", async (req, res) => {
    try {
      const { name, email, password, role } = req.body;

      const oldUser = await prisma.user.findUnique({
        where: { email: email },
      });

      if (oldUser) {
        return res.status(400).json({
          success: false,
          error: "Email already registered, try another email",
        });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: { name, email, password: hashPassword, role },
      });
      res.json({ success: true, message: "User succesfully created", newUser });
    } catch (err) {
      console.error("Server error", err);
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      const oldUser = await prisma.user.findUnique({
        where: { email: email },
      });
      if (!oldUser) {
        return res.status(400).json({ success: false, error: "Check email" });
      }
      const passwordCompare = bcrypt.compare(password, oldUser.password);
      if (passwordCompare) {
        return res
          .status(400)
          .json({ success: false, error: "password mismatch" });
      }
    } catch (err) {
      console.error("Server error", err);
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  return router;
}
