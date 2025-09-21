import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export default function (req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ success: false, error: "Not Autorize" });
  }

  try {
    const verified = jwt.verify(token.split(" ")[1], SECRET);
    req.user = verified;
    return next();
  } catch (err) {
    console.error({ Error: err });
    return res.status(400).json({ success: false, error: err.message });
  }
}
