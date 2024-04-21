import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export function requireLogin(req, res, next) {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(404).json({ error: "Không tìm thấy access token." });
  }

  try {
    // Giải mã access token để lấy thông tin payload
    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);

    if (decoded.exp * 1000 <= Date.now()) {
      throw new Error("Hết hạn accessToken");
    }

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ error: "Access token không hợp lệ." });
  }
}
