import Order from "../models/order";

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
