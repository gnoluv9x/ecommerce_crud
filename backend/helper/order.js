import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Product from "../models/product";

dayjs.extend(customParseFormat);

export const updateProductQuantity = products => {
  products.forEach(product => {
    Product.findByIdAndUpdate(
      product.id,
      { $inc: { quantity: -product.quantity, sold: product.quantity } },
      { new: true },
      (err, updatedProduct) => {
        if (err) {
          console.log("============== Debug_here err ==============");
          console.dir(err, { depth: null });
        } else {
          console.log("Product quantity updated successfully:", updatedProduct);
        }
      }
    );
  });
};

export const getOrderDataDayByDayInMonth = (lists = [], currentMonth) => {
  const totalDaysInMonth = dayjs(currentMonth, "MM/YYYY").daysInMonth();
  let results = [];

  for (let day = 1; day <= totalDaysInMonth; day++) {
    const currentDateString = `0${day}/${currentMonth}`.slice(-10); // format date as 01/01/2024
    const startOfDay = dayjs(currentDateString, "DD/MM/YYYY").startOf("day");
    const endOfDay = dayjs(currentDateString, "DD/MM/YYYY").endOf("day");

    let totalPrice = 0,
      totalOrders = 0,
      successOrder = 0,
      pendingOrder = 0,
      cancelOrder = 0,
      successOrderPrice = 0,
      pendingOrderPrice = 0,
      cancelOrderPrice = 0;

    lists.forEach(order => {
      const currentOrderCreatedAt = dayjs(order.createdAt);

      if (currentOrderCreatedAt.isAfter(startOfDay) && currentOrderCreatedAt.isBefore(endOfDay)) {
        totalPrice += order.totalPrice;
        totalOrders += 1;

        if (order.status === "success") {
          successOrder += 1;
          successOrderPrice += order.totalPrice;
        }
        if (order.status === "pending") {
          pendingOrder += 1;
          pendingOrderPrice += order.totalPrice;
        }
        if (order.status === "cancel") {
          cancelOrder += 1;
          cancelOrderPrice += order.totalPrice;
        }
      }
    });

    const dayItem = {
      dayInMonths: `0${day}`.slice(-2),
      date: currentDateString,
      totalPrice,
      totalOrders,
      successOrder,
      pendingOrder,
      cancelOrder,
      successOrderPrice,
      pendingOrderPrice,
      cancelOrderPrice,
    };

    results.push(dayItem);
  }

  return results;
};
