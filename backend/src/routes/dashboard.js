import express from "express";
import crypto from "crypto";
import QRCode from "qrcode";

export default function (prisma) {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      //   // Only allow merchants
      //   if (req.user.role !== "MERCHANT") {
      //     return res
      //       .status(403)
      //       .json({ success: false, error: "Not authorized" });
      //   }

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

  router.post("/qr", async (req, res) => {
    try {
      const { id } = req.user;
      const { amount } = req.body;

      if (req.user.role !== "MERCHANT") {
        return res.status(404).json({ success: false, error: "Access denied" });
      }
      const qrId = crypto.randomUUID();

      const qrdata = JSON.stringify({
        qrId: qrId,
        merchantId: id,
        amount: amount || null,
        date: new Date().toISOString(),
      });

      const qrimage = await QRCode.toDataURL(qrdata);

      const qrRecord = await prisma.merchantQR.create({
        data: {
          merchantId: id,
          amount: amount,
          qrId: qrId,
          qrString: qrdata,
        },
      });
      return res.status(201).json({
        success: true,
        message: "Successfully created the QRcode",
        qrcode: qrimage,
        qrRecord,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

  router.get("/qr", async (req, res) => {
    try {
      const qrRecord = await prisma.merchantQR.findMany({
        where: { merchantId: req.user.id },
        select: {
          id: true,
          amount: true,
          status: true,
          createdAt: true,
          qrString: true,
        },
      });

      if (!qrRecord) {
        return res
          .status(401)
          .json({ success: false, error: "No QRCode created yet" });
      }

      const qrImages = await Promise.all(
        qrRecord.map(async (record) => {
          const qrConvert = await QRCode.toDataURL(record.qrString);
          return {
            ...record,
            qrConvert,
          };
        })
      );

      return res
        .status(200)
        .json({ success: true, message: "QRCode", qrcode: qrImages, qrRecord });
    } catch (err) {
      return res.status(500).json({ Error: err });
    }
  });

  return router;
}
