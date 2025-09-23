import express from "express";

export default function (prisma) {
  const router = express.Router();

  router.post("/payment", async (req, res) => {
    try {
      const { id } = req.user;
      const { merchantId, qrId, amount } = req.body;

      if (!id || !merchantId || !qrId || !amount) {
        return res.status(400).json({
          success: false,
          error: "userId, merchantId, qrId, and amount are required",
        });
      }
      const merchantQR = await prisma.merchantQR.findUnique({
        where: {
          qrId: qrId,
        },
        select: { status: true },
      });

      const user = await prisma.user.findUnique({
        where: { id: id },
        select: {
          walletBalance: true,
        },
      });

      const merchant = await prisma.user.findUnique({
        where: { id: merchantId },
        select: {
          walletBalance: true,
        },
      });

      if (!user || !merchant) {
        return res.status(400).json({
          success: false,
          error: "invalid user",
        });
      }

      if (user.walletBalance < amount) {
        return res
          .status(400)
          .json({ success: false, error: "Insufficient funds." });
      }

      if (merchantQR.status === "USED") {
        return res.status(400).json({
          success: true,
          message: "Transaction has been completed",
        });
      }

      const [updatedUser, updatedMerchant, updatedQRCode, transaction] =
        await prisma.$transaction([
          prisma.user.update({
            where: { id: id },
            data: {
              walletBalance: { decrement: amount },
            },
          }),
          prisma.user.update({
            where: { id: merchantId },
            data: {
              walletBalance: { increment: amount },
            },
          }),

          prisma.merchantQR.update({
            where: { qrId: qrId },
            data: { status: "USED" },
          }),

          prisma.transaction.create({
            data: {
              amount,
              userId: id,
              merchantId,
              status: "Success",
              paymentMethod: "wallet",
            },
          }),
        ]);

      return res.status(200).json({
        success: true,
        message: "Transaction completed.",
        transaction,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

  router.post("/fund", async (req, res) => {
    try {
      const { id } = req.user;
      const { amount } = req.body;

      if (!id) {
        res.status(400).json({ success: false, error: "Invalid user" });
      }

      const user = await prisma.user.update({
        where: { id: req.user.id },
        data: { walletBalance: { increment: amount } },
      });
      res
        .status(200)
        .json({ success: true, message: "Fund succesffuly added" }, user);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  return router;
}
