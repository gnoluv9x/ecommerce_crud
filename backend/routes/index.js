import express from "express";
import productRoutes from "./product";
import categoryRoutes from "./category";
import authRoutes from "./auth";
import userRouters from "./user";
import orderRouters from "./order";
import checkoutRouters from "./checkout";
import { requireLogin } from "../middlewares/checkAuth";

const router = express.Router();

router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRouters);
// router.use("/orders", requireLogin, orderRouters);
router.use("/orders", orderRouters);
router.use("/checkout", checkoutRouters);

module.exports = router;
