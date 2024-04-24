import { updateProductQuantity } from "../helper/order";
import Order from "../models/order";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export const list = (req, res) => {
  Order.find()
    .populate("user", "_id name email permission")
    .exec((err, data) => {
      if (err) {
        res.status(400).json({
          error: "Order not found",
        });
      }
      res.json(data);
    });
};
export const orderByUser = (req, res) => {
  // console.log(req.profile)
  Order.find({ user: req.profile._id }, (err, orders) => {
    if (err) {
      res.status(400).json({
        error: "Orders not found",
      });
    }
    res.json(orders);
  });
};
export const create = (req, res) => {
  const order = new Order(req.body);
  order.save((err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Add order failed",
      });
    }

    updateProductQuantity(data.cart);

    res.json(data);
  });
};
export const orderById = (req, res, next, id) => {
  Order.findById(id).exec((err, order) => {
    if (err || !order) {
      res.status(404).json({
        error: "Không tìm thấy đơn hàng!",
      });
    }
    req.order = order;
    next();
  });
};
export const read = (req, res) => {
  return res.json(req.order);
};
export const remove = (req, res) => {
  let order = req.order;
  order.remove((err, deletedOrder) => {
    if (err) {
      return res.status(400).json({
        error: "Không xoá được đơn hàng!",
      });
    }
    res.json({
      deletedOrder,
      message: "Xoá đơn hàng thành công",
    });
  });
};
export const update = (req, res) => {
  const order = req.order;
  order.status = req.body.status;
  order.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Cập nhật đơn hàng không thành công!",
      });
    }
    res.json(data);
  });
};

// Endpoint để tìm và đếm số order theo tháng
export const getOrderDaysSummary = async (req, res) => {
  try {
    // Lấy tháng từ client gửi lên: sẽ có dạng 4/2024, 5/2024...
    const { month } = req.query;

    // Kiểm tra xem tháng được gửi lên có hợp lệ không
    const monthWithZeroAtFirst = `0${month}`.slice(-7);
    const isValidDate = dayjs(monthWithZeroAtFirst, "MM/YYYY", true).isValid();

    if (!isValidDate) {
      return res.status(400).json({ error: "Sai định dạng ngày" });
    }

    const startDate = dayjs(monthWithZeroAtFirst, "MM/YYYY", true).startOf("month").toDate();
    const endDate = dayjs(monthWithZeroAtFirst, "MM/YYYY", true).endOf("month").toDate();

    const result = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate }, // Lọc order trong khoảng thời gian từ đầu đến cuối của tháng
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" }, // Nhóm theo tháng
          totalOrders: { $sum: 1 }, // Đếm số lượng order
          totalOrderSuccess: {
            $sum: { $cond: [{ $eq: ["$status", "success"] }, 1, 0] }, // Tổng số order có status là success
          },
          totalOrderPending: {
            $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] }, // Tổng số order có status là pending
          },
          totalOrderCancel: {
            $sum: { $cond: [{ $eq: ["$status", "cancel"] }, 1, 0] }, // Tổng số order có status là cancel
          },
          totalSuccessPrice: {
            $sum: { $cond: [{ $eq: ["$status", "success"] }, "$totalPrice", 0] },
          },
          totalPendingPrice: {
            $sum: { $cond: [{ $eq: ["$status", "pending"] }, "$totalPrice", 0] },
          },
          totalCancelPrice: {
            $sum: { $cond: [{ $eq: ["$status", "cancel"] }, "$totalPrice", 0] },
          },
        },
      },
    ]);

    const respData = result.length > 0 ? result[0] : {};

    const targetMonth = dayjs(monthWithZeroAtFirst, "MM/YYYY", true).get("month") + 1;
    respData.month = targetMonth;
    delete respData._id;

    // Trả về kết quả
    res.json(respData);
  } catch (error) {
    console.log("Debug_here error: ", error);
    res.status(500).json({ error: "Có lỗi" });
  }
};

export const getOrderDaysOfMonth = async (req, res) => {
  try {
    // Lấy tháng từ client gửi lên: sẽ có dạng 4/2024, 5/2024...
    const { month } = req.query;

    // Kiểm tra xem tháng được gửi lên có hợp lệ không
    const monthWithZeroAtFirst = `0${month}`.slice(-7);
    const isValidDate = dayjs(monthWithZeroAtFirst, "MM/YYYY", true).isValid();

    if (!isValidDate) {
      return res.status(400).json({ error: "Sai định dạng ngày" });
    }

    const startDate = dayjs(monthWithZeroAtFirst, "MM/YYYY", true).startOf("month").toDate();
    const endDate = dayjs(monthWithZeroAtFirst, "MM/YYYY", true).endOf("month").toDate();

    // Lấy tất cả các đơn hàng trong khoảng thời gian từ MongoDB
    const orders = await Order.find({
      createdAt: { $gte: startDate, $lte: endDate },
    });

    console.log("Debug_here orders: ", orders);

    // Trả về kết quả
    res.status(200).json([]);
  } catch (error) {
    console.log("Debug_here error: ", error);
    res.status(500).json({ error: "Có lỗi xảy ra" });
  }
};
