import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Product_list, Product_remove } from "../../../slice/productSlice";
import { ErrorMessage, SuccessMessage, prices } from "../../../utils/util";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Spinner from "../../../components/admin/Spinner";

const ProductManagerPage = () => {
  const dispatch = useDispatch();

  const products = useSelector(state => state.product.data.products);
  const loading = useSelector(state => state.product.loading);

  const confirmRemove = id => {
    confirmAlert({
      title: "CONFIRM?",
      message: "Are you sure you want to delete?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(Product_remove(id))
              .unwrap()
              .then(() => {
                SuccessMessage("Delete successfully!");
              })
              .catch(() => {
                ErrorMessage("Delete failed");
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

  useEffect(() => {
    dispatch(Product_list());
  }, []);

  return (
    <div className="h-100">
      {loading === false ? (
        <div>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2 ml-5 mt-2">PRODUCT MANAGEMENT</h1>
          </div>
          <div>
            <div className="text-center mt-[30px]">
              <Link to="add">
                <button className="btn btn-primary mx-auto">Add product</button>
              </Link>
            </div>
            <div className="mt-4">
              <table className="table table-hover mx-auto ">
                <thead>
                  <tr className="text-center">
                    <th className="align-middle text-sm border border-black" scope="col">
                      No
                    </th>
                    <th className="align-middle text-sm border border-black" scope="col">
                      PRODUCT'S NAME
                    </th>
                    <th className="align-middle text-sm border border-black" scope="col">
                      CATEGORY
                    </th>
                    <th className="align-middle text-sm border border-black" scope="col">
                      IMAGE
                    </th>
                    <th className="align-middle text-sm border border-black" scope="col">
                      PRICE
                    </th>
                    <th className="align-middle text-sm border border-black" scope="col">
                      PROMOTIONAL PRICE
                    </th>
                    <th className="align-middle text-sm border border-black w-[5%]" scope="col">
                      WARRANTY (MONTHS)
                    </th>
                    <th className="align-middle text-sm border border-black" scope="col">
                      QUANTITY
                    </th>
                    <th
                      className="align-middle text-sm border border-black"
                      colSpan={2}
                      scope="col"
                    >
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.map((item, index) => {
                      return (
                        <tr key={item._id}>
                          <td className="border border-black font-semibold text-center" scope="row">
                            <div style={{ width: "30px" }}>{index + 1}</div>
                          </td>
                          <td
                            className="border border-black font-semibold"
                            style={{ width: "350px" }}
                          >
                            <div>
                              <Link to={`/products/${item._id}`}>{item.name}</Link>
                            </div>
                          </td>
                          <td className="border border-black font-semibold text-center">
                            {item.category.name}
                          </td>
                          <td className="border border-black " style={{ width: "200px" }}>
                            <img
                              className="mx-auto"
                              style={{ width: "100%", height: "150px" }}
                              src={item.image}
                              alt=""
                            />
                          </td>
                          <td className="border border-black text-center text-red-500 font-semibold">
                            {prices(Number(item.price)).replace("VND", "₫")}
                          </td>
                          <td className="border border-black text-center text-red-500 font-semibold">
                            {prices(Number(item.priceSale)).replace("VND", "₫")}
                          </td>
                          <td className="border border-black text-center">{item.guarantee}</td>
                          <td className="border border-black text-center">{item.quantity}</td>
                          <td className=" text-center border" style={{ width: "50px" }}>
                            <div style={{ width: "30px" }}>
                              <Link
                                to={`/admin/products/update/${item._id}`}
                                className="text-sm px-1 border border-gray-600 rounded-lg bg-blue-500 hover:bg-blue-700 text-white btn btn-primary"
                              >
                                <i className="px-1 far fa-edit" />
                              </Link>
                            </div>
                          </td>
                          <td className=" text-center border">
                            <div style={{ width: "30px" }}>
                              <button
                                className="text-sm px-1 border border-gray-600 rounded-lg bg-red-500 hover:bg-red-700 text-white btn btn-danger btn-remove"
                                onClick={async () => {
                                  confirmRemove(item._id);
                                }}
                              >
                                <i className="px-1 fas fa-trash-alt" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ProductManagerPage;
