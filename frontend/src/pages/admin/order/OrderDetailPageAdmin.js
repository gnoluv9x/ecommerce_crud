import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Order_read } from "../../../slice/orderSlice";
import { prices } from "../../../utils/util";

const OrderDetailPageAdmin = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Order_read(id));
  }, [id]);

  const order = useSelector(state => state.order.data.order);
  const { cart } = order;
  console.log("cart", cart);
  return (
    <>
      <div className="pb-[400px]">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2 ml-5 mt-2">CHI TIẾT ĐƠN HÀNG</h1>
        </div>
        <div className="mx-auto grid grid-cols-6 gap-2" style={{ width: "1200px" }}>
          <div className="col-span-2 text-left  ">
            <h4 className="text-center text-2xl font-semibold border-b py-2">
              Thông tin người mua hàng
            </h4>
            <div className="px-4 mt-4">
              <div>
                <p className="mt-3">
                  <span className="font-semibold">Họ và tên:</span>{" "}
                  <span>{order && order.name}</span>
                </p>
                <p className="mt-3">
                  <span className="font-semibold">Địa chỉ:</span>{" "}
                  <span>{order && order.address}</span>
                </p>
                <p className="mt-3">
                  <span className="font-semibold">SDT:</span>{" "}
                  <span>{order && order.phoneNumber}</span>
                </p>
                <p className="mt-3">
                  <span className="font-semibold">Email:</span> <span>{order && order.email}</span>
                </p>
                <p className="mt-3">
                  <span className="font-semibold">Ngày đặt:</span>{" "}
                  <span>{order && order.createdAt}</span>
                </p>
                <p className="mt-3">
                  <span className="font-semibold">Số sản phẩm:</span>{" "}
                  <span>{order && order.cartNumber}</span>
                </p>
                <p className="mt-3">
                  <span className="font-semibold">Ghi chú: </span> {order && order.note}
                </p>
                <p className="mt-3">
                  <span className="font-semibold">Trạng thái:</span>{" "}
                  <span>
                    {order && order.status}
                    {order.status === "CHƯA DUYỆT" ? (
                      <span className="text-red-500 px-1">
                        <i className="fas fa-times"></i>
                      </span>
                    ) : (
                      <span className="text-green-500 px-1">
                        <i className="fas fa-check"></i>
                      </span>
                    )}
                  </span>
                </p>
                <p className="mt-3">
                  <span className="font-semibold">Tổng tiền:</span>{" "}
                  <span className="font-bold text-red-500">
                    {prices(Number(order && order.totalPrice)).replace("VND", "Đ")}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-4 ">
            <h4 className="text-center text-2xl font-semibold py-2 border-b">Thông tin sản phẩm</h4>
            <table className="mx-auto text-center table table-hover">
              <thead>
                <tr className="text-center">
                  <th style={{ width: "50px" }}>STT</th>
                  <th style={{ width: "300px" }}>Tên sản phẩm</th>
                  <th style={{ width: "150px" }}>Đơn giá</th>
                  <th style={{ width: "100px" }}>Số lượng</th>
                  <th style={{ width: "150px" }}>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {cart &&
                  cart.map((item, index) => {
                    return (
                      <tr className="text-center" key={item._id}>
                        <td>{index + 1}</td>
                        <td className=" grid grid-cols-4">
                          <img className="col-span-1" src={item.image} alt="" width={90} />
                          <p className="col-span-3">{item.name}</p>
                        </td>
                        <td>
                          <span className="cart_price_show">
                            {prices(Number(item.price)).replace("VND", "Đ")}
                          </span>
                          <span className="cart_price hidden">{Number(item.price)}</span>
                        </td>
                        <td>{item.quantity}</td>
                        <td>
                          <span className="cart_cost_show font-semibold">
                            {prices(Number(item.price) * Number(item.quantity)).replace("VND", "Đ")}
                          </span>
                          <span className="cart_cost hidden ">
                            {Number(item.price) * Number(item.quantity)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailPageAdmin;
