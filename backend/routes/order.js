import express from "express";
import {
  create,
  list,
  orderById,
  orderByUser,
  read,
  remove,
  update,
  getOrderDaysSummary,
  getOrderDaysOfMonth,
} from "../controllers/order";
import { userById } from "../controllers/user";
import { requireLogin } from "../middlewares/checkAuth";

const router = express.Router();

//Danh sách đơn hàng
router.get("", list);
//Danh sách đơn hàng theo user
router.get("/users/:userId", orderByUser);
//Thêm đơn hàng
router.post("", requireLogin, create);
// Tổng quát
router.get("/summary-days", getOrderDaysSummary);
// Chi tiết từng ngày trong tháng
router.get("/report-days", getOrderDaysOfMonth);
//Chi tiêt đơn hàng
router.get("/:orderId", read);
//Xoá đơn hàng
router.delete("/:orderId", remove);
//Cập nhật trạng thái đơn hàng
router.put("/:orderId", update);
//Lấy param
router.param("orderId", orderById);
router.param("userId", userById);

module.exports = router;
