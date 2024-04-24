import React from "react";
import { NavLink } from "react-router-dom";
import { SuccessMessage, WarningMessage, addToCart, prices } from "../../utils/util";

const ProductItem = ({ product }) => {
  const isSoldOut = product.quantity < 1;

  return (
    <div className="group overflow-hidden shadow-md bg-white relative">
      {isSoldOut && (
        <div className="text-white bg-red-400 px-3 py-2 absolute top-0 right-0 z-10">Hết hàng</div>
      )}
      <div className="bg-white overflow-hidden flex flex-col">
        <div className="py-2 h-[55%] flex justify-center items-center flex-shrink-0">
          <NavLink
            to={`/products/${product._id}`}
            className="group-hover:transform group-hover:scale-90 transition duration-500 ease-in-out inline-block w-100 aspect-w-1 aspect-h-1"
          >
            <img className=" w-100 h-100 object-contain" src={product.image} alt="product_image" />
          </NavLink>
        </div>
        <NavLink to={`/products/${product._id}`}>
          <span className="text-center text-sm pt-1 group-hover:text-yellow-600 px-2">
            {product.name}
          </span>
        </NavLink>
        <p className="text-red-500 text-lg font-bold py-1">
          {prices(Number(product.priceSale)).replace("VND", "Đ")}
          <span className="text-gray-500 text-base ml-2 font-bold pt-1italic line-through">
            {prices(Number(product.price)).replace("VND", "Đ")}
          </span>
        </p>
        {!isSoldOut && (
          <div className="transition duration-300 ease-in-out transform translate-y-44 group-hover:-translate-y-0">
            <button
              data-id={product._id}
              className="bg-blue-500 text-white text-base font-bold rounded-md btn_addCart mb-2 hover:bg-blue-700"
              style={{ padding: "6px 50px" }}
              onClick={() => {
                if (product.quantity > 0) {
                  addToCart(
                    product._id,
                    product.name,
                    product.image,
                    product.priceSale,
                    product.quantity
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
        )}
      </div>
    </div>
  );
};

export default ProductItem;
