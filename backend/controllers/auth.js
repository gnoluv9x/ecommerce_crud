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
    return res.status(200).json({ status: false, message: "Email already exists" });
  }

  const user = new User(req.body);

  user.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Adding account failed",
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
        message: "Email does not exist",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        status: false,
        message: "Incorrect password",
      });
    }
    // Tạo access token
    const accessToken = generateAccessToken(user._id);

    // Tạo refresh token
    const refreshToken = generateRefreshToken(user._id);
    const maxAge = process.env.REFRESH_TOKEN_COOKIE_EXPIRED_IN_DAYS;

    // token sẽ hết hạn trong 30 ngày
    res.cookie("refreshToken", refreshToken, {
      maxAge: parseInt(maxAge) * 24 * 60 * 60 * 1000 * 30,
    });
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
    message: "Logout successfully",
  });
}

export async function isAuth(req, res, next) {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  console.log(user);
  if (!user) {
    return res.status(403).json({
      error: "You have no permissions",
    });
  }
  next();
}

export async function isAdmin(req, res, next) {
  if (req.profile.permission == 0) {
    return res.status(403).json({
      error: "Not ADMIN, access denied!",
    });
  }
  next();
}

export async function refreshToken(req, res, next) {
  // Lấy refresh token từ cookie
  const refreshToken = req.cookies.refreshToken;

  // Kiểm tra xem refresh token có tồn tại không
  if (!refreshToken) {
    return res.status(404).json({ error: "No refresh token found in cookie." });
  }

  try {
    // Giải mã refresh token để lấy thông tin payload
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    if (decoded.exp * 1000 <= Date.now()) {
      throw new Error("RefreshToken expired");
    }

    console.log("Debug_here decoded: ", decoded);
    // Tạo access token mới từ thông tin payload
    const accessToken = generateAccessToken(decoded.userId);

    // Trả về access token mới
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Lỗi khi giải mã hoặc tạo access token:", error);
    res.status(500).json({ error: "An error occurred while processing the request." });
  }
}

export async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(404).json({ error: "Please enter email" });
    }

    User.findOne({ email: email.toLowerCase() }, async (error, user) => {
      if (!!error || !user) {
        return res.status(404).json({ status: false, message: "User does not exist" });
      } else {
        const newPassword = crypto.randomBytes(10).toString("hex");
        user.password = newPassword;
        await user.save();

        const html = /*html*/ `
        <div>
        <div>You have requested to retrieve your password, here is your new password:</div>
           <div>New password: <strong>${newPassword}</strong></div>
           <p>You can click on this link to <a href="http://localhost:4001/signin">log in now</a></p>
        </div>
        `;

        const emailInfos = await sendMailService(email, html, "Reset password");
        console.log("Debug_here emailInfos: ", emailInfos);

        return res.status(200).json({
          status: true,
          message: "Password reset successfully, please check your email.",
        });
      }
    });
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).json({ error: "An error occurred while processing the request." });
  }
}
