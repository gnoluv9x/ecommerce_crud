import config from "config";
import crypto from "crypto";
import dayjs from "dayjs";
import querystring from "qs";
import { sortObject } from "../helper";
import Order from "../models/order";

// Thanh toán
export function createPaymentUrl(req, res, next) {
  /**
   * req.body
   * amount: int
   * bankCode: 
      "" : Cổng thanh toán VNPAYQR
      VNPAYQR : Thanh toán qua ứng dụng hỗ trợ VNPAYQR
      VNBANK : Thanh toán qua ATM-Tài khoản ngân hàng nội địa
      INTCARD : Thanh toán qua thẻ quốc tế
    * language: vn / en
    * orderId: string
   */

  console.log("Debug_here req.body: ", req.body);
  process.env.TZ = "Asia/Ho_Chi_Minh";

  let date = new Date();
  let createDate = dayjs(date).format("YYYYMMDDHHmmss");

  let ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  let tmnCode = config.get("vnp_TmnCode");
  let secretKey = config.get("vnp_HashSecret");
  let vnpUrl = config.get("vnp_Url");
  let returnUrl = config.get("vnp_ReturnUrl");
  let orderId = req.body.orderId;
  let amount = req.body.amount;
  let bankCode = req.body.bankCode;

  let locale = req.body.language;
  if (locale === null || locale === "") {
    locale = "vn";
  }
  let currCode = "VND";
  let vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD: " + orderId;
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  console.log("============== Debug_here vnp_Params ==============");
  console.dir(vnp_Params, { depth: null });

  let signData = querystring.stringify(vnp_Params, { encode: false });

  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

  console.log("============== Debug_here vnpUrl ==============");
  console.dir(vnpUrl, { depth: null });

  res.status(200).json({
    status: true,
    data: vnpUrl,
  });
}

export function returnUrl(req, res, next) {
  let vnp_Params = req.query;

  let secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);

  console.log("============== Debug_here vnp_Params vnpay_return ==============");
  console.dir(vnp_Params, { depth: null });

  // Lấy thông tin order từ vnpay trả về
  const orderId = vnp_Params.vnp_TxnRef;

  let secretKey = config.get("vnp_HashSecret");

  let signData = querystring.stringify(vnp_Params, { encode: false });

  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    // Tìm và cập nhật trạng thái của order
    Order.findByIdAndUpdate(
      orderId,
      {
        $set: {
          checkoutStatus: vnp_Params.vnp_ResponseCode === "00" ? "success" : "fail",
        },
      },
      { new: true },
      function (err, doc) {
        if (err || vnp_Params.vnp_ResponseCode !== "00") {
          return res.redirect(`http://localhost:4001/order/${orderId}`);
        } else {
          return res.redirect(
            `http://localhost:4001/order/${orderId}?message=Thanh+to%C3%A1n+th%C3%A0nh+c%C3%B4ng&checkoutStatus=success`
          );
        }
      }
    );
  } else {
    return res.redirect(
      `http://localhost:4001/order/${orderId}?message=Thanh+to%C3%A1n+th%E1%BA%A5t+b%E1%BA%A1i&checkoutStatus=fail`
    );
  }
}
