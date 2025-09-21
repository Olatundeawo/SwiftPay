import express from "express";

export default function (prisma) {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      // Only allow merchants
      if (req.user.role !== "MERCHANT") {
        return res
          .status(403)
          .json({ success: false, error: "Not authorized" });
      }

      // Fetch user details (exclude password for safety)
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          walletBalance: true,
        },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: "User can't be found.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Successfully retrieved user",
        user,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: "Server error" });
    }
  });

  return router;
}
