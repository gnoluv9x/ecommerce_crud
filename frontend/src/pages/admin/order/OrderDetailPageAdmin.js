import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2 ml-5 mt-2">ORDER DETAILS</h1>
      </div>
      <div className="mx-auto grid grid-cols-6 gap-2 w-[1200px]">
        <div className="col-span-2 text-left  ">
          <h4 className="text-center text-2xl font-semibold border-b py-2">Buyer information</h4>
          <div className="px-4 mt-4">
            <div>
              <p className="mt-3 flex justify-between border-b">
                <span className="font-semibold">Full name:</span> <span>{order && order.name}</span>
              </p>
              <p className="mt-3 flex justify-between border-b">
                <span className="font-semibold">Address:</span>{" "}
                <span>{order && order.address}</span>
              </p>
              <p className="mt-3 flex justify-between border-b">
                <span className="font-semibold">Phone number:</span>{" "}
                <span>{order && order.phoneNumber}</span>
              </p>
              <p className="mt-3 flex justify-between border-b">
                <span className="font-semibold">Email:</span> <span>{order && order.email}</span>
              </p>
              <p className="mt-3 flex justify-between border-b">
                <span className="font-semibold">Order date:</span>{" "}
                <span>{order && order.createdAt}</span>
              </p>
              <p className="mt-3 flex justify-between border-b">
                <span className="font-semibold">Quantity:</span>{" "}
                <span>{order && order.cartNumber}</span>
              </p>
              <p className="mt-3 flex justify-between border-b">
                <span className="font-semibold">Note: </span> {order && order.note}
              </p>
              <p className="mt-3 flex justify-between border-b">
                <span className="font-semibold">Status:</span>{" "}
                <span className="capitalize">
                  {order.status}
                  {order.status === "success" && (
                    <span className="text-green-500 px-1">
                      <i className="fas fa-check"></i>
                    </span>
                  )}
                  {order.status === "pending" && (
                    <span className="text-[#F29339] pl-2">
                      <i className="far fa-clock"></i>
                    </span>
                  )}
                  {order.status === "cancel" && (
                    <span className="text-red-500 px-1">
                      <i className="fas fa-times"></i>
                    </span>
                  )}
                </span>
              </p>
              <p className="mt-3 flex justify-between border-b">
                <span className="font-semibold">Total price:</span>{" "}
                <span className="font-bold text-red-500">
                  {prices(Number(order && order.totalPrice)).replace("VND", "₫")}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-4 ">
          <h4 className="text-center text-2xl font-semibold py-2 border-b">Product info</h4>
          <table className="mx-auto text-center table table-hover">
            <thead>
              <tr className="text-center">
                <th style={{ width: "50px" }}>Index</th>
                <th style={{ width: "300px" }}>Product name</th>
                <th style={{ width: "150px" }}>Price</th>
                <th style={{ width: "100px" }}>Quantity</th>
                <th style={{ width: "150px" }}>Total price</th>
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
                          {prices(Number(item.price)).replace("VND", "₫")}
                        </span>
                        <span className="cart_price hidden">{Number(item.price)}</span>
                      </td>
                      <td>{item.quantity}</td>
                      <td>
                        <span className="cart_cost_show font-semibold">
                          {prices(Number(item.price) * Number(item.quantity)).replace("VND", "₫")}
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
    </>
  );
};

export default OrderDetailPageAdmin;
