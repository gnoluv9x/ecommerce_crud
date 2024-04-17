import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { isAuthenticated, prices, SuccessMessage, WarningMessage } from "../../utils/util";
import { Order_listByUser, OrderByUser_remove } from "../../slice/orderSlice";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import productApi from "../../api/productApi";
import { Product_update } from "../../slice/productSlice";

const OrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = isAuthenticated();
  console.log(user);
  useEffect(() => {
    dispatch(Order_listByUser(user._id));
  }, [user._id]);
  const orders = useSelector(state => state.order.data.ordersByUser);
  useEffect(() => {
    dispatch(Order_listByUser(user._id));
  }, []);
  console.log("ordersByUser: ", orders);

  const confirmRemove = item => {
    confirmAlert({
      title: "XÁC NHẬN?",
      message: "Bạn có chắc chắn muốn huỷ đơn hàng này?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            item.cart.forEach(async ele => {
              const { data } = await productApi.read(ele.id);
              data.quantity += ele.quantity;
              console.log(data);
              dispatch(Product_update(data));
            });
            dispatch(OrderByUser_remove(item._id));
            navigate("/order");
            SuccessMessage("Huỷ đơn hàng thành công");
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
      <ToastContainer />
      <div className="div-content bg-gray-100 pb-8">
        <div className="content1 mx-auto" style={{ maxWidth: "1200px" }}>
          <div className="pt-2">
            <h5 className="py-3 font-semibold">
              <i className="fas fa-home px-1"></i>
              <Link to="/">Trang chủ</Link>

              <i className="fas fa-angle-double-right text-xs px-1" />
              <i className="fas fa-clipboard-list px-1"></i>
              <Link to="/order">Đơn hàng</Link>
            </h5>
          </div>
          <div className="mt-4">
            {orders.length === 0 ? (
              <div>
                <div className="text-center text-4xl font-semibold pt-32 pb-4">
                  Bạn chưa có đơn hàng nào <i className="far fa-frown" />
                </div>
                <div className="text-center mb-32">
                  <Link to="/" className="btn btn-primary">
                    Mua ngay
                  </Link>
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
                              {item.status === "CHƯA DUYỆT" ? (
                                <span className="text-lg px-2 text-red-500">
                                  <i className="fas fa-times-circle"></i>
                                </span>
                              ) : (
                                <span className="text-lg text-green-500 px-1">
                                  <i className="fas fa-check-circle"></i>
                                </span>
                              )}
                            </span>
                          </td>
                          <td>
                            <Link to={`/order/${item._id}`}>
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
                                      "Không thể huỷ đơn hàng ĐÃ DUYỆT hoặc ĐÃ HOÀN THÀNH!"
                                    );
                                  } else {
                                    confirmRemove(item);
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
    </>
  );
};

export default OrderPage;
