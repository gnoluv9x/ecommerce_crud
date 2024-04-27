import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Checkout_create } from "../../slice/checkoutSlice";
import { Order_create } from "../../slice/orderSlice";
import {
  ErrorMessage,
  SuccessMessage,
  WarningMessage,
  getCurrentDate,
  getUserInfos,
  prices,
} from "../../utils/util";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = getUserInfos();
  const [toggleOrder, setToggleOrder] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  let productOnCart = JSON.parse(localStorage.getItem("cart"));
  console.log("Debug_here productOnCart: ", productOnCart);
  let cartNumber = localStorage.getItem("cartNumber");
  let totalPrice = localStorage.getItem("totalPrice");

  const alertLogin = () => {
    navigate("/signin");
  };

  const toggle = () => {
    setToggleOrder(!toggleOrder);
  };

  const removeCart = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("cartNumber");
    localStorage.removeItem("totalPrice");
    dispatchEvent(new Event("storage"));
    navigate("/cart");
  };

  const onSubmit = data => {
    const order = {
      user: user._id,
      name: data.name,
      address: data.address,
      phoneNumber: data.phoneNumber,
      email: data.email,
      note: data.note,
      paymentMethod: data.paymentMethod,
      cart: productOnCart,
      cartNumber: cartNumber,
      totalPrice: totalPrice,
      create_at: getCurrentDate(),
      status: "pending",
      checkoutStatus: data.paymentMethod === "cod" ? "success" : "pending",
    };

    dispatch(Order_create(order))
      .unwrap()
      .then(result => {
        if (result.paymentMethod === "cod") {
          SuccessMessage("Order Success!", 2000);

          localStorage.removeItem("cart");
          localStorage.removeItem("cartNumber");
          localStorage.removeItem("totalPrice");
          dispatchEvent(new Event("storage"));

          navigate(`/order/${result._id}`);
        } else {
          dispatch(
            Checkout_create({
              language: "vn",
              amount: result.totalPrice,
              bankCode: result.paymentMethod,
              orderId: result._id,
            })
          )
            .unwrap()
            .then(resp => {
              if (resp.status) {
                localStorage.removeItem("cart");
                localStorage.removeItem("cartNumber");
                localStorage.removeItem("totalPrice");
                dispatchEvent(new Event("storage"));

                window.location.href = resp.data;
              } else {
                throw new Error("Thanh toán thất bại");
              }
            })
            .catch(err => {
              throw err?.message || err;
            });
        }
      })
      .catch(err => {
        console.log("Debug_here err: ", err);
        ErrorMessage("Order creation failed");
      });
  };

  const handleChangeQuantity = (type, itemId) => {
    const currentCardItem = productOnCart.find(item => item.id === itemId);

    if (!currentCardItem) {
      WarningMessage("The product does not exist in the shopping cart");
      return;
    }

    let newCart = productOnCart;

    if (type === "desc") {
      if (currentCardItem.quantity === 1) {
        return handleRemoveItem(itemId);
      } else {
        const newQuantity = currentCardItem.quantity - 1;
        newCart = productOnCart.map(cartItem => {
          if (cartItem.id === itemId) {
            cartItem.quantity = newQuantity;
          }

          return cartItem;
        });
      }
    }

    if (type === "asc") {
      const newQuantity = currentCardItem.quantity + 1;
      newCart = productOnCart.map(cartItem => {
        if (cartItem.id === itemId) {
          cartItem.quantity = newQuantity;
        }

        return cartItem;
      });
    }

    let cartNumber = 0;
    let totalPrice = 0;

    newCart.forEach(cartItem => {
      totalPrice += cartItem.quantity * cartItem.price;
      cartNumber += cartItem.quantity;
    });

    localStorage.setItem("cartNumber", cartNumber);
    localStorage.setItem("totalPrice", totalPrice);
    localStorage.setItem("cart", JSON.stringify(newCart));
    dispatchEvent(new Event("storage"));
    navigate("/cart");
  };

  const handleRemoveItem = cartId => {
    const newCart = productOnCart.filter(cartItem => cartItem.id !== cartId);

    if (newCart.length === 0) {
      localStorage.removeItem("cart");
      localStorage.removeItem("cartNumber");
      localStorage.removeItem("totalPrice");
      dispatchEvent(new Event("storage"));
    } else {
      let cartNumber = 0;
      let totalPrice = 0;

      newCart.forEach(cartItem => {
        totalPrice += cartItem.quantity * cartItem.price;
        cartNumber += cartItem.quantity;
      });

      localStorage.setItem("cartNumber", cartNumber);
      localStorage.setItem("totalPrice", totalPrice);
      localStorage.setItem("cart", JSON.stringify(newCart));
      dispatchEvent(new Event("storage"));
    }

    navigate("/cart");
  };

  return (
    <>
      {productOnCart === null ? (
        <div>
          <div className="text-center text-4xl font-semibold pt-32 pb-4">
            You have not added any products to your cart <i className="far fa-frown" />
          </div>
          <div className="text-center mb-32">
            <Link to="/" className="btn btn-primary">
              Homepage
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="div-content bg-gray-100 pb-8">
            <div className="content1 mx-auto" style={{ maxWidth: "1200px" }}>
              <div className="flex justify-between items-center py-2">
                <h5 className="py-3 font-semibold">
                  <i className="fas fa-home px-1"></i>
                  <Link to="/">Homepage</Link>
                  <i className="fas fa-angle-double-right text-xs px-1" />
                  <i className="fas fa-shopping-cart px-1"></i>
                  <Link to="/cart">Cart</Link>
                </h5>
              </div>
              <div id="list_cart">
                <div>
                  <div onClick={removeCart} className="text-right mb-2">
                    <button id="removeCart" className="btn btn-danger">
                      Delete cart
                    </button>
                  </div>
                  <table>
                    <thead>
                      <tr className="text-center">
                        <th className="border border-gray-300 w-[100px]">Index</th>
                        <th className="border border-gray-300 w-[650px]">Product name</th>
                        <th className="border border-gray-300 w-[200px]">Unit price</th>
                        <th className="border border-gray-300 w-[100px]">Quantity</th>
                        <th className="border border-gray-300 w-[200px]">Money wall</th>
                        <th className="border border-gray-300 w-[100px]">Delete</th>
                      </tr>
                    </thead>
                    <tbody id="showListCart">
                      {productOnCart.map((item, index) => {
                        return (
                          <tr key={item.id} className="text-center">
                            <td className="border border-gray-300">{index + 1}</td>
                            <td className="border border-gray-300 flex">
                              <img src={item.image} alt="" width={70} />
                              <p className="px-2">
                                <Link to={`/products/${item.id}`}>{item.name}</Link>
                              </p>
                            </td>
                            <td className="border border-gray-300">
                              <span className="cart_price_show">
                                {prices(Number(item.price)).replace("VND", "₫")}
                              </span>
                              <span className="cart_price hidden">{Number(item.price)}</span>
                            </td>
                            <td className="border border-gray-300">
                              <div className="flex justify-center items-center gap-1">
                                <button
                                  className="text-sm border border-gray-600 rounded-md px-2 text-white btn_minus cursor-pointer bg-blue-500"
                                  onClick={() => handleChangeQuantity("desc", item.id)}
                                >
                                  -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                  className="text-sm border border-gray-600 rounded-lg px-2 text-white btn_plus cursor-pointer bg-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                  onClick={() => handleChangeQuantity("asc", item.id)}
                                  disabled={item.quantity === item.stock}
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="border border-gray-300">
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
                            <td className="border border-gray-300">
                              <div>
                                <button
                                  className="text-sm px-1 border border-gray-600 rounded-lg bg-red-500 hover:bg-red-700 text-white btn btn-danger btn-remove"
                                  onClick={() => handleRemoveItem(item.id)}
                                >
                                  <i className="px-1 fas fa-trash-alt" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      <tr>
                        <td colSpan={2} className="border border-gray-400" />
                        <td colSpan={4} className="border border-gray-400">
                          <p className="text-red-500 font-bold my-3 ml-3 text-lg text-right pr-[100px] uppercase">
                            Total: <span id="totalCost" />
                            {prices(Number(totalPrice)).replace("VND", "₫")}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="flex justify-end mt-4 pb-4">
                    <Link to="/">
                      <button className="btn btn-primary mr-4">Continue shopping</button>
                    </Link>
                    {user ? (
                      <div>
                        <button onClick={toggle} id="btn_order" className="btn btn-primary">
                          Order
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button onClick={alertLogin} id="alertOder" className="btn btn-danger">
                          Log in to order
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {toggleOrder === true ? (
            <div className="bg-gray-100" id="oderPage">
              <div className="mx-auto" style={{ maxWidth: "1230px" }}>
                <div className=" px-3 pb-5">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-5 gap-3"
                    id="form_addOder"
                  >
                    <div className="col-span-3 border">
                      <div className="border-b pt-1 px-3">
                        <h3 className="text-lg pb-1 font-semibold">
                          1. Khách hàng khai báo thông tin
                        </h3>
                      </div>
                      <div className="ml-5">
                        <h4 className="text-base mt-4 font-semibold">Buyer information</h4>
                        <p className="text-sm mt-1">Parts marked * are required</p>
                        <div className="flex mt-4">
                          <p style={{ minWidth: "120px" }}>Full name *</p>
                          <input
                            type="text"
                            {...register("name", { required: true })}
                            className="form-control checkValidate"
                            id="fullname"
                            placeholder="Nguyen Van A"
                            style={{ width: "420px", height: "30px" }}
                          />
                        </div>
                        <div>
                          {errors.name && (
                            <span className="text-red-500 font-semibold ml-[120px]">
                              Please enter complete information!
                            </span>
                          )}
                        </div>
                        <div className="flex mt-4">
                          <p style={{ minWidth: "120px" }}>Address*</p>
                          <input
                            type="text"
                            {...register("address", { required: true })}
                            className="form-control checkValidate"
                            id="address"
                            placeholder="No. 165 - Cau Giay - Cau Giay District - Hanoi"
                            style={{ width: "420px", height: "30px" }}
                          />
                        </div>
                        <div>
                          {errors.address && (
                            <span className="text-red-500 font-semibold ml-[120px]">
                              Please enter complete information!
                            </span>
                          )}
                        </div>
                        <div className="flex mt-4">
                          <p style={{ minWidth: "120px" }}>Phone number*</p>
                          <input
                            type="number"
                            {...register("phoneNumber", { required: true })}
                            className="form-control checkValidate"
                            id="phoneNumber"
                            placeholder="+84 xxx xxx xxx"
                            style={{ width: "420px", height: "30px" }}
                          />
                        </div>
                        <div>
                          {errors.phoneNumber && (
                            <span className="text-red-500 font-semibold ml-[120px]">
                              Please enter complete information!
                            </span>
                          )}
                        </div>
                        <div className="flex mt-4">
                          <p style={{ minWidth: "120px" }}>Email</p>
                          <input
                            type="email"
                            {...register("email", { required: true })}
                            className="form-control checkValidate"
                            id="email"
                            placeholder="abc@xyz.com"
                            style={{ width: "420px", height: "30px" }}
                          />
                        </div>
                        <div>
                          {errors.email && (
                            <span className="text-red-500 font-semibold ml-[120px]">
                              Please enter complete information!
                            </span>
                          )}
                        </div>
                        <div>
                          <p
                            className="errorEmail text-red-500 text-sm font-semibold mt-1"
                            style={{ marginLeft: "120px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div>
                        <div className="border-t border-l border-r pt-1 px-3">
                          <h3 className="text-lg pb-1 font-semibold">2. Notes for orders</h3>
                        </div>
                        <div className="p-2 border">
                          <textarea
                            {...register("note", { required: true })}
                            id="note"
                            rows={3}
                            className="w-full form-control checkValidate"
                          />
                          <div>
                            {errors.note && (
                              <span className="text-red-500 font-semibold">
                                Please enter complete information!
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="border-t border-l border-r pt-1 px-3">
                          <h3 className="text-lg pb-1 font-semibold">3. Choose payment method</h3>
                        </div>
                        <div className="p-3 border">
                          <div className="mt-1 flex gap-1 items-center cursor-pointer">
                            <input
                              type="radio"
                              id="vnpay"
                              value=""
                              defaultChecked
                              {...register("paymentMethod", { required: true })}
                            />
                            <label className="cursor-pointer" for="vnpay">
                              VNPAYQR payment gateway
                            </label>
                          </div>
                          <div className="mt-1 flex gap-1 items-center cursor-pointer">
                            <input
                              type="radio"
                              id="atm"
                              value="VNBANK"
                              {...register("paymentMethod", { required: true })}
                            />
                            <label className="cursor-pointer" for="atm">
                              Payment via ATM-Domestic bank account
                            </label>
                          </div>
                          <div className="mt-1 flex gap-1 items-center cursor-pointer">
                            <input
                              type="radio"
                              id="cod"
                              value="cod"
                              {...register("paymentMethod", { required: true })}
                            />
                            <label className="cursor-pointer" for="cod">
                              Payment upon delivery (COD)
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="text-center mt-3">
                        <input
                          type="submit"
                          className="btn btn-primary py-2 uppercase"
                          value="Create order"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </>
  );
};

export default CartPage;
