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
  const { user } = isAuthenticated();

  useEffect(() => {
    dispatch(Order_read(id));
  }, [id]);

  const order = useSelector(state => state.order.data.order);
  const { cart } = order;

  useEffect(() => {
    if (message) {
      if (checkoutStatus) {
        SuccessMessage(message, 3000);
      } else {
        ErrorMessage(message, 3000);
      }

      setSearchParams({});
    }
  }, [checkoutStatus, message]);

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user]);

  return (
    <>
      <div className="bg-gray-100">
        <div className="mx-auto w-[1200px]">
          <div className="pt-2 pl-3">
            <h5 className="py-3">
              <i className="fas fa-clipboard-list px-1"></i>
              <Link to="/order">Đơn hàng</Link>
              <i className="fas fa-angle-double-right text-xs px-1" />
              <i className="fas fa-info-circle px-1"></i>
              Chi tiết
            </h5>
          </div>
          <div className="grid grid-cols-6 gap-3 pb-4">
            <div className="col-span-2 text-left">
              <h4 className="text-left text-2xl font-semibold border-b py-2">
                Thông tin người mua hàng
              </h4>
              <div className="mt-2">
                <div>
                  <p className="mt-3 flex justify-between border-bottom border-[#aaaaaa]">
                    <span className="font-semibold">Họ và tên:</span>{" "}
                    <span>{order && order.name}</span>
                  </p>
                  <p className="mt-3 flex justify-between border-bottom border-[#aaaaaa]">
                    <span className="font-semibold">Địa chỉ:</span>{" "}
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
                    <span className="font-semibold">Ngày đặt:</span>{" "}
                    <span>
                      {order && order.createdAt
                        ? dayjs(order.createdAt).format("HH:mm:ss DD/MM/YYYY")
                        : ""}
                    </span>
                  </p>
                  <p className="mt-3 flex justify-between border-bottom border-[#aaaaaa]">
                    <span className="font-semibold">Số sản phẩm:</span>{" "}
                    <span>{order && order.cartNumber}</span>
                  </p>
                  <p className="mt-3 flex justify-between border-bottom border-[#aaaaaa]">
                    <span className="font-semibold">Ghi chú: </span> {order && order.note}
                  </p>
                  <p className="mt-3 flex justify-between border-bottom border-[#aaaaaa]">
                    <span className="font-semibold">Trạng thái:</span>{" "}
                    <span>
                      {order?.status
                        ? order?.status === "success"
                          ? "Thành công"
                          : "Chờ duyệt"
                        : ""}
                      {order.status === "pending" ? (
                        <span className="text-[#F29339] px-1">
                          <i className="far fa-clock"></i>
                        </span>
                      ) : (
                        <span className="text-green-500 px-1">
                          <i className="fas fa-check"></i>
                        </span>
                      )}
                    </span>
                  </p>
                  <p className="mt-3 flex justify-between border-bottom border-[#aaaaaa]">
                    <span className="font-semibold">Trạng thái thanh toán:</span>{" "}
                    <span>
                      {order?.checkoutStatus
                        ? order?.checkoutStatus === "success"
                          ? "Thành công"
                          : "Chưa thanh toán"
                        : ""}
                      {order.checkoutStatus === "success" ? (
                        <span className="text-green-500 px-1">
                          <i className="fas fa-check"></i>
                        </span>
                      ) : (
                        <span className="text-[#F29339] px-1">
                          <i className="far fa-clock"></i>
                        </span>
                      )}
                    </span>
                  </p>
                  <p className="mt-3 flex justify-between border-bottom border-[#aaaaaa]">
                    <span className="font-semibold">Tổng tiền:</span>{" "}
                    <span className="font-bold text-red-500">
                      {prices(Number(order && order.totalPrice)).replace("VND", "Đ")}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-4 ">
              <h4 className="text-left text-2xl font-semibold py-2 border-b">Thông tin sản phẩm</h4>
              <table className="mx-auto text-center table table-hover">
                <thead>
                  <tr className="text-center">
                    <th className="w-[10%]">STT</th>
                    <th className="w-[40%]">Tên sản phẩm</th>
                    <th className="w-[15%]">Đơn giá</th>
                    <th className="w-[15%]">Số lượng</th>
                    <th className="w-[20%]">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {cart &&
                    cart.map((item, index) => {
                      return (
                        <tr className="text-center" key={item._id}>
                          <td className="align-middle">{index + 1}</td>
                          <td className=" grid grid-cols-3 gap-2">
                            <div class="col-span-1 flex items-center">
                              <img src={item.image} alt="" width={90} />
                            </div>
                            <p className="col-span-2">{item.name}</p>
                          </td>
                          <td className="align-middle">
                            <span className="cart_price_show">
                              {prices(Number(item.price)).replace("VND", "Đ")}
                            </span>
                            <span className="cart_price hidden">{Number(item.price)}</span>
                          </td>
                          <td className="align-middle">{item.quantity}</td>
                          <td className="align-middle">
                            <span className="cart_cost_show font-semibold">
                              {prices(Number(item.price) * Number(item.quantity)).replace(
                                "VND",
                                "Đ"
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
