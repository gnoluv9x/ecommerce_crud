import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  prices,
  SuccessMessage,
  WarningMessage,
  addToCart,
  getTotalItemOnCart,
  onLoadCartNumber,
} from "../../utils/util";
import { Product_update } from "../../slice/productSlice";
import productApi from "../../api/productApi";

const ProductItem = props => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buttonRef = useRef();
  // const { data: productCurrent } = await productApi.read(props.product._id)
  // console.log("productCurrent: ", productCurrent);
  const [count, setCount] = useState();
  useEffect(() => {}, [count]);

  // const onHandleAddToCart = async (e) => {
  //     const id = e.target.dataset.id;
  //     console.log(id)
  //     const { data } = await productApi.read(id)
  //     data.quantity -= 1;
  //     console.log("data: ", data);
  //     await productApi.update(id, data);
  // }

  return (
    <div className="group overflow-hidden shadow-md bg-white ">
      <div className="bg-white overflow-hidden ">
        <div className="py-2 transition duration-500 ease-in-out transform group-hover:scale-90">
          <NavLink to={`/products/${props.product._id}`}>
            <img className="mx-auto" src={props.product.image} alt="" width="80%" />
          </NavLink>
        </div>
        <NavLink to="/product">
          <span className="text-center text-sm pt-1 group-hover:text-yellow-600 px-2">
            {props.product.name}
          </span>
        </NavLink>
        <p className="text-red-500 text-lg font-bold py-1">
          {prices(Number(props.product.priceSale)).replace("VND", "Đ")}
          <span className="text-gray-500 text-base ml-2 font-bold pt-1italic line-through">
            {prices(Number(props.product.price)).replace("VND", "Đ")}
          </span>
        </p>
        <div className="transition duration-300 ease-in-out transform translate-y-24 group-hover:-translate-y-0">
          <button
            data-id={props.product._id}
            className="bg-blue-500 text-white text-base font-bold rounded-md btn_addCart mb-2 hover:bg-blue-700"
            style={{ padding: "6px 50px" }}
            onClick={async () => {
              if (props.product.quantity > 0) {
                // const { data } = await productApi.read(props.product._id)
                // data.quantity -= 1;
                // console.log(data);
                addToCart(
                  props.product._id,
                  props.product.name,
                  props.product.image,
                  props.product.priceSale
                );

                getTotalItemOnCart();
                SuccessMessage("Thêm sản phẩm vào giỏ hàng thành công!");
              } else {
                WarningMessage("Sản phẩm đã hết hàng, vui lòng chọn sản phẩm khác!");
              }
            }}

            // onClick={(e) => { onHandleAddToCart(e) }}
          >
            THÊM GIỎ HÀNG
          </button>
          {/* {(props.product.quantity === 0)
                        ? (
                            <button data-id={props.product._id} className="bg-blue-500 text-white text-base font-bold rounded-md btn_addCart mb-2 hover:bg-blue-700" style={{ padding: '6px 50px' }}
                                onClick={() => { 
                                    WarningMessage("Hết hàng!")
                                }}
                            >THÊM GIỎ HÀNG
                            </button>
                        ) : (
                            <button data-id={props.product._id} className="bg-blue-500 text-white text-base font-bold rounded-md btn_addCart mb-2 hover:bg-blue-700" style={{ padding: '6px 50px' }}
                                onClick={(e) => { onHandleAddToCart(e) }}
                            >THÊM GIỎ HÀNG
                            </button>
                        )
                    } */}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
