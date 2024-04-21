import React from "react";
import { NavLink } from "react-router-dom";
import { SuccessMessage, WarningMessage, addToCart, prices } from "../../utils/util";

const ProductItem = props => {
  return (
    <div className="group overflow-hidden shadow-md bg-white">
      <div className="bg-white overflow-hidden flex flex-col">
        <div className="py-2 h-[55%] flex justify-center items-center flex-shrink-0">
          <NavLink
            to={`/products/${props.product._id}`}
            className="group-hover:transform group-hover:scale-90 transition duration-500 ease-in-out inline-block w-100 aspect-w-1 aspect-h-1"
          >
            <img
              className=" w-100 h-100 object-contain"
              src={props.product.image}
              alt="product_image"
            />
          </NavLink>
        </div>
        <NavLink to={`/products/${props.product._id}`}>
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
        <div className="transition duration-300 ease-in-out transform translate-y-44 group-hover:-translate-y-0">
          <button
            data-id={props.product._id}
            className="bg-blue-500 text-white text-base font-bold rounded-md btn_addCart mb-2 hover:bg-blue-700"
            style={{ padding: "6px 50px" }}
            onClick={async () => {
              if (props.product.quantity > 0) {
                addToCart(
                  props.product._id,
                  props.product.name,
                  props.product.image,
                  props.product.priceSale
                );

                SuccessMessage("Thêm sản phẩm vào giỏ hàng thành công!");
              } else {
                WarningMessage("Sản phẩm đã hết hàng, vui lòng chọn sản phẩm khác!");
              }
            }}

            // onClick={(e) => { onHandleAddToCart(e) }}
          >
            THÊM GIỎ HÀNG
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
