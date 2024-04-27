import React, { useEffect } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../../../components/admin/Spinner";
import { Order_list, Order_remove } from "../../../slice/orderSlice";
import { ErrorMessage, SuccessMessage, prices } from "../../../utils/util";

const OrderManager = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Order_list());
  }, []);

  const orders = useSelector(state => state.order.data.orders);
  const loading = useSelector(state => state.order.loading);

  const confirmRemove = id => {
    confirmAlert({
      title: "CONFIRM?",
      message: "Are you sure you want to delete?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(Order_remove(id))
              .unwrap()
              .then(resp => {
                SuccessMessage("Deleted successfully!");
                // dispatch(Order_list());
              })
              .catch(err => {
                console.log("Debug_here err: ", err);
                ErrorMessage("Order cannot be deleted");
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

  return (
    <>
      <div className="h-100">
        {loading === false ? (
          <div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2 ml-5 mt-2">PRODUCT MANAGEMENT</h1>
            </div>
            <div className="mt-5 mx-auto" style={{ maxWidth: "1200px" }}>
              <div className="mt-4">
                {orders.length === 0 ? (
                  <div>
                    <div className="text-center text-4xl font-semibold pt-32 pb-4">
                      No orders yet!
                      <i className="far fa-frown" />
                    </div>
                  </div>
                ) : (
                  <div>
                    <table className="table table-hover">
                      <thead>
                        <tr className="text-center">
                          <th className="w-[5%]">Index</th>
                          <th className="w-[10%]">Full name</th>
                          <th className="w-[10%]">Phone number</th>
                          <th className="w-[10%]">Total amount</th>
                          <th className="w-[10%]">Order date</th>
                          <th className="w-[10%]">Status</th>
                          <th className="w-[12%]">Payement Status</th>
                          <th colSpan={2} className="w-[5%]">
                            Action
                          </th>
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
                                <span>{prices(item.totalPrice).replace("VND", "₫")}</span>
                              </td>
                              <td className="align-middle">
                                <span>{item.createdAt.split("T")[0]}</span>
                              </td>
                              <td className="align-middle">
                                <span className="capitalize">{item.status}</span>
                                <span className="checkStatus">
                                  {item.status === "success" ? (
                                    <span className="text-green-600 px-1 text-lg">
                                      <i className="fas fa-check-circle"></i>
                                    </span>
                                  ) : item.status === "cancel" ? (
                                    <span className="text-red-400 px-1 text-lg">
                                      <i className="fas fa-times"></i>
                                    </span>
                                  ) : (
                                    <Link to={`/admin/orders/update/${item._id}`}>
                                      <span className="text-lg px-1 ml-1 text-blue-400">
                                        <i className="fas fa-edit"></i>
                                      </span>
                                    </Link>
                                  )}
                                </span>
                              </td>
                              <td className="align-middle">
                                {item.checkoutStatus === "success" ? (
                                  <div className="">
                                    Success{" "}
                                    <span className="text-green-500 ml-1">
                                      <i className="fas fa-check-circle"></i>
                                    </span>
                                  </div>
                                ) : item.checkoutStatus === "pending" ? (
                                  <div className="">
                                    Pending
                                    <span className="text-yellow-500 ml-1">
                                      <i className="far fa-clock"></i>
                                    </span>
                                  </div>
                                ) : (
                                  <div className="">
                                    Cancel{" "}
                                    <span className="text-red-500 ml-1">
                                      <i className="fas fa-ban"></i>
                                    </span>
                                  </div>
                                )}
                              </td>
                              <td className="align-middle">
                                <div className="flex justify-between">
                                  <Link to={`/admin/orders/${item._id}`}>
                                    <button className="text-sm px-2 border border-gray-600 rounded-lg text-white btn btn-primary">
                                      <i className="fas fa-info-circle" />
                                    </button>
                                  </Link>
                                  {item.status === "pending" &&
                                    item.checkoutStatus !== "success" && (
                                      <button
                                        className="text-sm px-2 border border-gray-600 rounded-lg text-white btn btn-danger btn-remove"
                                        onClick={() => {
                                          confirmRemove(item._id);
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
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default OrderManager;
