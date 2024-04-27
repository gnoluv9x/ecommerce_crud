import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Order_read } from "../../slice/orderSlice";
import { ErrorMessage, SuccessMessage, isAuthenticated, prices } from "../../utils/util";
import dayjs from "dayjs";

const OrderDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const message = searchParams.get("message");
  const checkoutStatus = searchParams.get("checkoutStatus");
  const isAuth = isAuthenticated();

  useEffect(() => {
    dispatch(Order_read(id));
  }, [id]);

  const order = useSelector(state => state.order.data.order);
  const { cart } = order;

  useEffect(() => {
    if (message) {
      if (checkoutStatus === "success") {
        SuccessMessage(message, 3000);
      } else {
        ErrorMessage(message, 3000);
      }

      setSearchParams({});
    }
  }, [checkoutStatus, message]);

  useEffect(() => {
    if (!isAuth) {
      navigate("/signin");
    }
  }, [isAuth]);

  return (
    <>
      <div className="bg-gray-100">
        <div className="mx-auto w-[1200px]">
          <div className="pt-2 pl-3">
            <h5 className="py-3">
              <i className="fas fa-clipboard-list px-1"></i>
              <Link to="/order">Order</Link>
              <i className="fas fa-angle-double-right text-xs px-1" />
              <i className="fas fa-info-circle px-1"></i>
              Detail
            </h5>
          </div>
          <div className="grid grid-cols-6 gap-3 pb-4">
            <div className="col-span-2 text-left border-r pr-4">
              <h4 className="text-left text-2xl font-semibold border-b py-2">Buyer information</h4>
              <div className="mt-2">
                <div>
                  <p className="mt-3 flex justify-between border-bottom border-[#aaaaaa]">
                    <span className="font-semibold">Full name:</span>{" "}
                    <span>{order && order.name}</span>
                  </p>
                  <p className="mt-3 flex justify-between border-bottom border-[#aaaaaa]">
                    <span className="font-semibold">Address:</span>{" "}
                    <span>{order && order.address}</span>
                  </p>
                  <p className="mt-3 flex justify-between border-bottom border-[#aaaaaa]">
                    <span className="font-semibold">SDT:</span>{" "}
                    <span>{order && order.phoneNumber}</span>
                  </p>
                  <p className="mt-3 flex justify-between border-bottom border-[#aaaaaa]">
                    <span className="font-semibold">Email:</span>{" "}
                    <span>{order && order.email}</span>
                  </p>
                  <p className="mt-3 flex justify-between border-bottom border-[#aaaaaa]">
                    <span className="font-semibold">Placement date:</span>{" "}
                    <span>
                      {order && order.createdAt
                        ? dayjs(order.createdAt).format("HH:mm:ss DD/MM/YYYY")
                        : ""}
                    </span>
                  </p>
                  <p className="mt-3 flex justify-between border-bottom border-[#aaaaaa]">
                    <span className="font-semibold">Product number:</span>{" "}
                    <span>{order && order.cartNumber}</span>
                  </p>
                  <p className="mt-3 flex justify-between border-bottom border-[#aaaaaa]">
                    <span className="font-semibold">Note: </span> {order && order.note}
                  </p>
                  <p className="mt-3 flex justify-between border-bottom border-[#aaaaaa]">
                    <span className="font-semibold">Status:</span>{" "}
                    <span>
                      {order?.status
                        ? order?.status === "success"
                          ? "Success"
                          : order?.status === "pending"
                          ? "Pending"
                          : "Cancel"
                        : ""}
                      {order.status === "pending" && (
                        <span className="text-[#F29339] pl-2">
                          <i className="far fa-clock"></i>
                        </span>
                      )}
                      {order.status === "success" && (
                        <span className="text-green-500 pl-2">
                          <i className="fas fa-check"></i>
                        </span>
                      )}
                      {order.status === "cancel" && (
                        <span className="text-red-500 pl-2">
                          <i className="fas fa-times"></i>
                        </span>
                      )}
                    </span>
                  </p>
                  <p className="mt-3 flex justify-between border-bottom border-[#aaaaaa]">
                    <span className="font-semibold">Payment status:</span>{" "}
                    <span>
                      {order?.checkoutStatus
                        ? order?.checkoutStatus === "success"
                          ? "Success"
                          : order?.checkoutStatus === "pending"
                          ? "Unpaid"
                          : "Cancel"
                        : ""}
                      {order.checkoutStatus === "success" && (
                        <span className="text-green-500 pl-2">
                          <i className="fas fa-check"></i>
                        </span>
                      )}
                      {order.checkoutStatus === "pending" && (
                        <span className="text-[#F29339] pl-2">
                          <i className="far fa-clock"></i>
                        </span>
                      )}
                      {order.checkoutStatus === "fail" && (
                        <span className="text-red-400 pl-2">
                          <i className="fas fa-times"></i>
                        </span>
                      )}
                    </span>
                  </p>
                  <p className="mt-3 flex justify-between border-bottom border-[#aaaaaa]">
                    <span className="font-semibold">Total amount:</span>{" "}
                    <span className="font-bold text-red-500">
                      {prices(Number(order && order.totalPrice)).replace("VND", "VND")}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-4 ">
              <h4 className="text-left text-2xl font-semibold py-2 border-b">
                Product information
              </h4>
              <table className="mx-auto text-center table table-hover">
                <thead>
                  <tr className="text-center">
                    <th className="w-[10%]">STT</th>
                    <th className="w-[40%]">Product name</th>
                    <th className="w-[15%]">Unit price</th>
                    <th className="w-[15%]">Quantity</th>
                    <th className="w-[20%]">Amount of money</th>
                  </tr>
                </thead>
                <tbody>
                  {cart &&
                    cart.map((item, index) => {
                      return (
                        <tr className="text-center" key={item._id}>
                          <td className="align-middle">{index + 1}</td>
                          <td className=" grid grid-cols-3 gap-2">
                            <div className="col-span-1 flex items-center">
                              <img src={item.image} alt="" width={90} />
                            </div>
                            <p className="col-span-2">{item.name}</p>
                          </td>
                          <td className="align-middle">
                            <span className="cart_price_show">
                              {prices(Number(item.price)).replace("VND", "₫")}
                            </span>
                            <span className="cart_price hidden">{Number(item.price)}</span>
                          </td>
                          <td className="align-middle">{item.quantity}</td>
                          <td className="align-middle">
                            <span className="cart_cost_show font-semibold">
                              {prices(Number(item.price) * Number(item.quantity)).replace(
                                "VND",
                                "₫"
                              )}
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
      </div>
    </>
  );
};

export default OrderDetailPage;
