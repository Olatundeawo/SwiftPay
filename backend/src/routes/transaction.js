import express from "express";

export default function (prisma) {
  const router = express.Router();

  router.get("/details", async (req, res) => {
    try {
      const { id } = req.user;

      const user = await prisma.user.findUnique({
        where: { id: id },
        include: {
          sentTxs: {
            include: {
              merchant: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          receiveTxs: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err.message);
    }
  });

  return router;
}
