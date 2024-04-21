import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import productApi from "../../api/productApi";
import { Order_create } from "../../slice/orderSlice";
import { Product_update } from "../../slice/productSlice";
import {
  SuccessMessage,
  WarningMessage,
  getCurrentDate,
  isAuthenticated,
  prices,
} from "../../utils/util";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = isAuthenticated();

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
  let cartNumber = localStorage.getItem("cartNumber");
  let totalPrice = localStorage.getItem("totalPrice");

  const alertLogin = () => {
    // WarningMessage("Hãy đăng nhập để đặt hàng!");
    navigate("/signin");
  };
  const [toggleOrder, setToggleOrder] = useState(false);
  // useEffect(() => {
  //     const toggle = () => {
  //         setToggleOrder(!toggleOrder)
  //     }
  // }, [])
  const toggle = () => {
    setToggleOrder(!toggleOrder);
  };
  const order = () => {
    toggle();
  };

  const removeCart = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("cartNumber");
    localStorage.removeItem("totalPrice");
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
      cart: productOnCart,
      cartNumber: cartNumber,
      totalPrice: totalPrice,
      create_at: getCurrentDate(),
      status: "CHƯA DUYỆT",
    };

    dispatch(Order_create(order));
    productOnCart.forEach(async item => {
      console.log(item.id, item.quantity);
      const { data } = await productApi.read(item.id);
      data.quantity -= item.quantity;
      console.log(data);
      dispatch(Product_update(data));
    });
    SuccessMessage("Đặt hàng thành công!");
    setTimeout(() => {
      localStorage.removeItem("cart");
      localStorage.removeItem("cartNumber");
      localStorage.removeItem("totalPrice");
      navigate("/order");
    }, 1500);
  };

  const handleChangeQuantity = (type, itemId) => {
    const currentCardItem = productOnCart.find(item => item.id === itemId);

    if (!currentCardItem) {
      WarningMessage("Sản phẩm không tồn tại trong giỏ hàng");
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

    const totalPrice = newCart.reduce(
      (total, current) => (total += current.price * current.quantity),
      0
    );

    localStorage.setItem("cartNumber", newCart.length);
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
    } else {
      const totalPrice = newCart.reduce(
        (total, currentItem) => (total += currentItem.quantity * currentItem.price),
        0
      );
      localStorage.setItem("cartNumber", newCart.length);
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
            Bạn chưa thêm sản phẩm nào vào giỏ hàng <i className="far fa-frown" />
          </div>
          <div className="text-center mb-32">
            <Link to="/" className="btn btn-primary">
              Trang chủ
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
                  <Link to="/">Trang chủ</Link>
                  <i className="fas fa-angle-double-right text-xs px-1" />
                  <i className="fas fa-shopping-cart px-1"></i>
                  <Link to="/cart">Giỏ hàng</Link>
                </h5>
              </div>
              <div id="list_cart">
                <div>
                  <div onClick={removeCart} className="text-right mb-2">
                    <button id="removeCart" className="btn btn-danger">
                      Xoá giỏ hàng
                    </button>
                  </div>
                  <table>
                    <thead>
                      <tr className="text-center">
                        <th className="border border-gray-300 w-[100px]">STT</th>
                        <th className="border border-gray-300 w-[650px]">Tên sản phẩm</th>
                        <th className="border border-gray-300 w-[200px]">Đơn giá</th>
                        <th className="border border-gray-300 w-[100px]">Số lượng</th>
                        <th className="border border-gray-300 w-[200px]">Thành tiền</th>
                        <th className="border border-gray-300 w-[100px]">Xoá</th>
                      </tr>
                    </thead>
                    <tbody id="showListCart">
                      {productOnCart.map((item, index) => {
                        return (
                          <tr key={item.id} className="text-center">
                            <td className="border border-gray-300">{index + 1}</td>
                            <td className="border border-gray-300 flex">
                              <img src={item.image} alt="" width={70} />
                              <p className="px-2">{item.name}</p>
                            </td>
                            <td className="border border-gray-300">
                              <span className="cart_price_show">
                                {prices(Number(item.price)).replace("VND", "Đ")}
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
                                  className="text-sm border border-gray-600 rounded-lg px-2 text-white btn_plus cursor-pointer bg-blue-500"
                                  onClick={() => handleChangeQuantity("asc", item.id)}
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="border border-gray-300">
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
                            Tổng tiền: <span id="totalCost" />
                            {prices(Number(totalPrice)).replace("VND", "Đ")}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="flex justify-end mt-4 pb-4">
                    <Link to="/">
                      <button className="btn btn-primary mr-4">Tiếp tục mua hàng</button>
                    </Link>
                    {user ? (
                      <div>
                        <button onClick={order} id="btn_order" className="btn btn-primary">
                          Đặt hàng
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button onClick={alertLogin} id="alertOder" className="btn btn-danger">
                          Đăng nhập để đặt hàng
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
                        <h4 className="text-base mt-4 font-semibold">Thông tin người mua</h4>
                        <p className="text-sm mt-1">Những phần đánh dấu * là bắt buộc</p>
                        <div className="flex  mt-4">
                          <p style={{ minWidth: "120px" }}>Họ tên *</p>
                          <input
                            type="text"
                            {...register("name", { required: true })}
                            className="form-control checkValidate"
                            id="fullname"
                            placeholder="Nguyễn Văn A"
                            style={{ width: "420px", height: "30px" }}
                          />
                        </div>
                        <div>
                          {errors.name && (
                            <span className="text-red-500 font-semibold ml-[120px]">
                              Hãy nhập đầy đủ thông tin!
                            </span>
                          )}
                        </div>
                        <div className="flex mt-4">
                          <p style={{ minWidth: "120px" }}>Địa chỉ*</p>
                          <input
                            type="text"
                            {...register("address", { required: true })}
                            className="form-control checkValidate"
                            id="address"
                            placeholder="Số 165 - Cầu Giấy - Quận Cầu Giấy - Hà Nội"
                            style={{ width: "420px", height: "30px" }}
                          />
                        </div>
                        <div>
                          {errors.address && (
                            <span className="text-red-500 font-semibold ml-[120px]">
                              Hãy nhập đầy đủ thông tin!
                            </span>
                          )}
                        </div>
                        <div className="flex mt-4">
                          <p style={{ minWidth: "120px" }}>Số điện thoại*</p>
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
                              Hãy nhập đầy đủ thông tin!
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
                              Hãy nhập đầy đủ thông tin!
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
                    <div className="col-span-2 ">
                      <div>
                        <div className="border-t border-l border-r pt-1 px-3">
                          <h3 className="text-lg pb-1 font-semibold">2. Ghi chú cho đơn hàng</h3>
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
                                Hãy nhập đầy đủ thông tin!
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 ">
                        <div className="border-t border-l border-r pt-1 px-3">
                          <h3 className="text-lg pb-1 font-semibold">
                            3. Chọn phương thức thanh toán
                          </h3>
                        </div>
                        <div className="p-3 border">
                          <div className="text-white">
                            <input name="checkPay" type="radio" disabled /> Thanh toán tại cửa hàng
                          </div>
                          <div className="mt-1">
                            <input name="checkPay" type="radio" defaultChecked /> Thanh toán khi
                            nhận hàng (COD)
                          </div>
                          <div className="mt-1">
                            <input name="checkPay" type="radio" id="radio3" disabled /> Thanh toán
                            trực tuyến bằng thẻ ATM, IB, QR Code{" "}
                          </div>
                          <div className="mt-1">
                            <input name="checkPay" type="radio" id="radio4" disabled /> Thanh toán
                            trả góp online
                          </div>
                        </div>
                      </div>
                      <div className="text-center mt-3">
                        <input
                          type="submit"
                          className="btn btn-primary py-2"
                          value="GỬI ĐƠN HÀNG"
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
