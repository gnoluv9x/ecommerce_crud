import dayjs from "dayjs";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { OrderByUser_remove, Order_listByUser } from "../../slice/orderSlice";
import { SuccessMessage, getUserInfos, prices } from "../../utils/util";

const OrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector(state => state.order.data.ordersByUser);

  const confirmRemove = item => {
    confirmAlert({
      title: "CONFIRM?",
      message: "Are you sure you want to cancel this order??",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(OrderByUser_remove(item._id))
              .unwrap()
              .then(() => {
                navigate("/order");
                SuccessMessage("Order canceled successfully");
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
    const isAuth = Cookies.get("accessToken");
    if (!isAuth) {
      navigate("/signin");
    } else {
      const { user } = getUserInfos();
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
              <Link to="/">Homepage</Link>

              <i className="fas fa-angle-double-right text-xs px-1" />
              <i className="fas fa-clipboard-list px-1"></i>
              <Link to="/order">Order</Link>
            </h5>
          </div>
          <div className="mt-4">
            {orders.length === 0 ? (
              <div>
                <div className="text-center text-4xl font-semibold pt-32 pb-4">
                  You don't have any orders yet <i className="far fa-frown" />
                </div>
                <div className="text-center mb-32">
                  <Link to="/" className="btn btn-primary">
                    Buy now
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <table className="table table-hover">
                  <thead>
                    <tr className="text-center">
                      <th className="w-[5%]">STT</th>
                      <th className="w-[20%]">Full name</th>
                      <th className="w-[10%]">Phone number</th>
                      <th className="w-[10%]">Total amount</th>
                      <th className="w-[10%]">Order date</th>
                      <th className="w-[10%]">Status</th>
                      <th className="w-[15%]">Payment Status</th>
                      <th className="w-[10%]">Options</th>
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
                            <span>{prices(item.totalPrice).replace("VND", "VND")}</span>
                          </td>
                          <td className="align-middle">
                            <span className="break-words">
                              {item.createdAt
                                ? dayjs(item.createdAt).format("HH:mm:ss DD/MM/YYYY")
                                : ""}
                            </span>
                          </td>
                          <td className="align-middle">
                            <span>
                              {item.status === "pending"
                                ? "Pending"
                                : item.status === "success"
                                ? "Success"
                                : "Cancel"}
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
                              {item.checkoutStatus === "pending"
                                ? "Unpaid"
                                : item.checkoutStatus === "success"
                                ? "Success"
                                : "Cancel"}
                            </span>
                            <span className="checkStatus">
                              {item.checkoutStatus === "pending" && (
                                <span className="text-[#F29339] px-1">
                                  <i className="far fa-clock"></i>
                                </span>
                              )}
                              {item.checkoutStatus === "success" && (
                                <span className="text-lg text-green-500 px-1">
                                  <i className="fas fa-check-circle"></i>
                                </span>
                              )}
                              {item.checkoutStatus === "fail" && (
                                <span className="text-lg text-red-500 px-1">
                                  <i className="fas fa-times"></i>
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
