import dotenv from "dotenv";
import { generateAccessToken, generateRefreshToken } from "../helper";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { sendMailService } from "../services/sendMailservice";
import crypto from "crypto";
dotenv.config();

export async function signup(req, res) {
  const { email } = req.body;
  const existingUser = await User.findOne({ email: email.toLowerCase() });

  if (existingUser) {
    return res.status(200).json({ status: false, message: "Email đã tồn tại" });
  }

  const user = new User(req.body);

  user.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm tài khoản không thành công",
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      status: true,
      data,
    });
  });
}

export async function signin(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res.status(404).json({
        status: false,
        message: "Email không tồn tại",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        status: false,
        message: "Mật khẩu không chính xác",
      });
    }
    // Tạo access token
    const accessToken = generateAccessToken(user._id);

    // Tạo refresh token
    const refreshToken = generateRefreshToken(user._id);
    const maxAge = process.env.REFRESH_TOKEN_COOKIE_EXPIRED_IN_DAYS;
    res.cookie("refreshToken", refreshToken, { maxAge: parseInt(maxAge) * 24 * 60 * 60 * 1000 });
    res.cookie("accessToken", accessToken, { maxAge: parseInt(maxAge) * 24 * 60 * 60 * 1000 });

    const { _id, name, email, permission } = user;

    return res.json({
      status: true,
      token: accessToken,
      user: { _id, email, name, permission },
    });
  });
}

export async function signout(req, res) {
  res.clearCookie("refreshToken");
  res.json({
    message: "Đăng xuất thành công",
  });
}

export async function isAuth(req, res, next) {
  console.log(req.profile);
  console.log("auth", req.auth);
  // console.log(req.profile._id);
  // console.log(req.auth._id);
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  console.log(user);
  if (!user) {
    return res.status(403).json({
      error: "Từ chối quyền truy cập!",
    });
  }
  next();
}

export async function isAdmin(req, res, next) {
  if (req.profile.permission == 0) {
    return res.status(403).json({
      error: "Không phải ADMIN, từ chối quyền truy cập!",
    });
  }
  next();
}

export async function refreshToken(req, res, next) {
  // Lấy refresh token từ cookie
  const refreshToken = req.cookies.refreshToken;

  // Kiểm tra xem refresh token có tồn tại không
  if (!refreshToken) {
    return res.status(404).json({ error: "Không tìm thấy refresh token trong cookie." });
  }

  try {
    // Giải mã refresh token để lấy thông tin payload
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    if (decoded.exp * 1000 <= Date.now()) {
      throw new Error("Hết hạn refreshToken");
    }

    // Tạo access token mới từ thông tin payload
    const accessToken = generateAccessToken("1123");

    // Trả về access token mới
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Lỗi khi giải mã hoặc tạo access token:", error);
    res.status(500).json({ error: "Đã xảy ra lỗi khi xử lý yêu cầu." });
  }
}

export async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(404).json({ error: "Chưa truyền email" });
    }

    User.findOne({ email: email.toLowerCase() }, async (error, user) => {
      if (!!error || !user) {
        return res.status(404).json({ status: false, message: "Người dùng không tồn tại" });
      } else {
        const newPassword = crypto.randomBytes(10).toString("hex");
        user.password = newPassword;
        await user.save();

        const html = /*html*/ `
        <div>
          <div>Bạn đã yêu cầu lấy lại mật khẩu, đây là mật khẩu mới của bạn:</div>
          <div>Mật khẩu mới: <strong>${newPassword}</strong></div>
          <p>Bạn có thể click vào link này để <a href="http://localhost:4001/signin">đăng nhập ngay</a></p>
        </div>
        `;

        const emailInfos = await sendMailService(email, html, "Lấy lại mật khẩu");
        console.log("Debug_here emailInfos: ", emailInfos);

        return res
          .status(200)
          .json({ status: true, message: "Lấy lại mật khẩu thành công, vui lòng check email." });
      }
    });
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).json({ error: "Đã xảy ra lỗi khi xử lý yêu cầu." });
  }
}
