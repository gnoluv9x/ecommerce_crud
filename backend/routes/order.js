import express from "express";
import { list, create, orderById, read, remove, update, orderByUser } from "../controllers/order";
import { userById } from "../controllers/user";
import { requireSignin, isAdmin, isAuth } from "../controllers/auth";

const router = express.Router();

//Danh sách đơn hàng
router.get("/orders", list);
//Danh sách đơn hàng theo user
router.get("/orders/users/:userId", orderByUser);
//Thêm đơn hàng
router.post("/orders", create);
//Chi tiêt đơn hàng
router.get("/orders/:orderId", read);
//Xoá đơn hàng
router.delete("/orders/:orderId", remove);
//Cập nhật trạng thái đơn hàng
router.put("/orders/:orderId", update);
//Lấy param
router.param("orderId", orderById);
router.param("userId", userById);

module.exports = router;
