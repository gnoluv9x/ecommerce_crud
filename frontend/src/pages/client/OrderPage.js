import dayjs from "dayjs";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { OrderByUser_remove, Order_listByUser } from "../../slice/orderSlice";
import { SuccessMessage, prices } from "../../utils/util";

const OrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector(state => state.order.data.ordersByUser);

  const confirmRemove = item => {
    confirmAlert({
      title: "XÁC NHẬN?",
      message: "Bạn có chắc chắn muốn huỷ đơn hàng này?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(OrderByUser_remove(item._id))
              .unwrap()
              .then(() => {
                navigate("/order");
                SuccessMessage("Huỷ đơn hàng thành công");
              });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  useEffect(() => {
    const user = Cookies.get("accessToken");
    if (!user) {
      navigate("/signin");
    } else {
      dispatch(Order_listByUser(user._id));
    }
  }, []);

  return (
    <>
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
                      <th className="w-[5%]">STT</th>
                      <th className="w-[20%]">Họ và tên</th>
                      <th className="w-[10%]">Số điện thoại</th>
                      <th className="w-[10%]">Tổng tiền</th>
                      <th className="w-[20%]">Ngày đặt hàng</th>
                      <th className="w-[10%]">Trạng thái</th>
                      <th className="w-[15%]">Trạng thái thanh toán</th>
                      <th className="w-[10%]">Tuỳ chọn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item, index) => {
                      return (
                        <tr className="text-center" key={item._id}>
                          <td className="align-middle">{index + 1}</td>
                          <td className="align-middle">
                            <span className="px-2">{item.name}</span>
                          </td>
                          <td className="align-middle">
                            <span>{item.phoneNumber}</span>
                          </td>
                          <td className="align-middle">
                            <span>{prices(item.totalPrice).replace("VND", "Đ")}</span>
                          </td>
                          <td className="align-middle">
                            <span>
                              {item.createdAt
                                ? dayjs(item.createdAt).format("HH:mm:ss DD/MM/YYYY")
                                : ""}
                            </span>
                          </td>
                          <td className="align-middle">
                            <span>
                              {item.status === "success"
                                ? "Chờ duyệt"
                                : item.status === "success"
                                ? "Thành công"
                                : "Huỷ"}
                            </span>
                            <span className="checkStatus">
                              {item.status === "pending" ? (
                                <span className="text-[#F29339] px-1">
                                  <i className="far fa-clock"></i>
                                </span>
                              ) : item.status === "success" ? (
                                <span className="text-lg text-green-500 px-1">
                                  <i className="fas fa-check-circle"></i>
                                </span>
                              ) : (
                                <span className="text-lg text-red-500 px-1">
                                  <i className="fas fa-times"></i>
                                </span>
                              )}
                            </span>
                          </td>
                          <td className="align-middle">
                            <span>
                              {item.checkoutStatus === "pending" ? "Chưa thanh toán" : "Thành công"}
                            </span>
                            <span className="checkStatus">
                              {item.checkoutStatus === "pending" ? (
                                <span className="text-[#F29339] px-1">
                                  <i className="far fa-clock"></i>
                                </span>
                              ) : (
                                <span className="text-lg text-green-500 px-1">
                                  <i className="fas fa-check-circle"></i>
                                </span>
                              )}
                            </span>
                          </td>
                          <td className="align-middle">
                            <div className="flex justify-start gap-3">
                              <Link to={`/order/${item._id}`}>
                                <button className="text-sm px-2 border border-gray-600 rounded-lg text-white btn btn-primary">
                                  <i className="fas fa-info-circle" />
                                </button>
                              </Link>
                              {item.checkoutStatus !== "success" && item.status !== "success" && (
                                <button
                                  className="text-sm px-2 border border-gray-600 rounded-lg text-white btn btn-danger btn-remove"
                                  onClick={() => {
                                    confirmRemove(item);
                                  }}
                                >
                                  <i className="fas fa-trash-alt"></i>
                                </button>
                              )}
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
