import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const generateAccessToken = userId => {
  const accessToken = jwt.sign({ userId: userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_TIME,
  });

  return accessToken;
};

export const generateRefreshToken = userId => {
  const refreshToken = jwt.sign({ userId: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_TIME,
  });

  return refreshToken;
};

export const sortObject = obj => {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
};
