import React from "react";
import ProductItem from "./ProductItem";

const ListProduct = props => {
  return (
    <div className="grid grid-cols-3 gap-6 gap-y-6 mt-[20px] text-center">
      {props.data.map(item => (
        <ProductItem key={item._id} product={item} />
      ))}
    </div>
  );
};

export default ListProduct;
