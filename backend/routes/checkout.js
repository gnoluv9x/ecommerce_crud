import express from "express";
import { createPaymentUrl, returnUrl } from "../controllers/checkout";

const router = express.Router();

router.post("/create_payment_url", createPaymentUrl);
router.get("/vnpay_return", returnUrl);

module.exports = router;
