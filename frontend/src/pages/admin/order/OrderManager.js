import React, { useEffect } from "react";
import Spin from "react-cssfx-loading/lib/Spin";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Order_list, Order_remove } from "../../../slice/orderSlice";
import { SuccessMessage, WarningMessage, prices } from "../../../utils/util";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const OrderManager = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Order_list());
  }, []);
  const orders = useSelector(state => state.order.data.orders);
  const loading = useSelector(state => state.order.loading);
  console.log("orders: ", orders);

  const confirmRemove = id => {
    confirmAlert({
      title: "XÁC NHẬN?",
      message: "Bạn có chắc chắn muốn xoá?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(Order_remove(id));
            SuccessMessage("Xoá thành công!");
            navigate("/admin/orders");
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <>
      <div className="pb-[500px]">
        {loading === false ? (
          <div className="pb-[400px]">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2 ml-5 mt-2">QUẢN TRỊ SẢN PHẨM</h1>
            </div>
            <div className="mt-5 mx-auto" style={{ maxWidth: "1200px" }}>
              <div className="mt-4">
                {orders.length === 0 ? (
                  <div>
                    <div className="text-center text-4xl font-semibold pt-32 pb-4">
                      Chưa có đơn hàng!
                      <i className="far fa-frown" />
                    </div>
                  </div>
                ) : (
                  <div>
                    <table className="table table-hover">
                      <thead>
                        <tr className="text-center">
                          <th style={{ width: "50px" }}>STT</th>
                          <th style={{ width: "300px" }}>Họ và tên</th>
                          <th style={{ width: "175px" }}>Số điện thoại</th>
                          <th style={{ width: "175px" }}>Tổng tiền</th>
                          <th style={{ width: "170px" }}>Ngày đặt hàng</th>
                          <th style={{ width: "200px" }}>Trạng thái</th>
                          <th colSpan={2} style={{ width: "100px" }}>
                            Tuỳ chọn
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((item, index) => {
                          return (
                            <tr className="text-center" key={item._id}>
                              <td>{index + 1}</td>
                              <td>
                                <span className="px-2">{item.name}</span>
                              </td>
                              <td>
                                <span>{item.phoneNumber}</span>
                              </td>
                              <td>
                                <span>{prices(item.totalPrice).replace("VND", "Đ")}</span>
                              </td>
                              <td>
                                <span>{item.createdAt.split("T")[0]}</span>
                              </td>
                              <td>
                                <span>{item.status}</span>
                                <span className="checkStatus">
                                  {item.status === "ĐÃ HOÀN THÀNH" ? (
                                    <span className="text-green-600 px-1 text-lg">
                                      <i className="fas fa-check-circle"></i>
                                    </span>
                                  ) : (
                                    <Link to={`/admin/orders/update/${item._id}`}>
                                      <span className="text-lg px-1">
                                        <i className="fas fa-edit"></i>
                                      </span>
                                    </Link>
                                  )}
                                </span>
                              </td>
                              <td>
                                <Link to={`/admin/orders/${item._id}`}>
                                  <button className="text-sm px-2 border border-gray-600 rounded-lg text-white btn btn-primary">
                                    <i className="fas fa-info-circle" />
                                  </button>
                                </Link>
                              </td>
                              <td>
                                <div>
                                  <button
                                    className="text-sm px-2 border border-gray-600 rounded-lg text-white btn btn-danger btn-remove"
                                    onClick={() => {
                                      if (
                                        item.status === "ĐÃ HOÀN THÀNH" ||
                                        item.status === "ĐÃ DUYỆT"
                                      ) {
                                        WarningMessage(
                                          "Không thể xoá đơn hàng ĐÃ DUYỆT hoặc ĐÃ HOÀN THÀNH!"
                                        );
                                      } else {
                                        confirmRemove(item._id);
                                      }
                                    }}
                                  >
                                    <i className="fas fa-trash-alt"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="py-[300px]">
            <Spin className="mx-auto" color="#0d6efd" width="30px" height="30px" />
          </div>
        )}
      </div>
    </>
  );
};

export default OrderManager;
