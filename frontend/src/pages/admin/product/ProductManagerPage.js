import React from "react";
import Spin from "react-cssfx-loading/lib/Spin";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Product_remove } from "../../../slice/productSlice";
import { SuccessMessage, prices } from "../../../utils/util";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const ProductManagerPage = () => {
  const products = useSelector(state => state.product.data.products);
  const loading = useSelector(state => state.product.loading);
  console.log(products);
  const dispatch = useDispatch();

  const confirmRemove = id => {
    confirmAlert({
      title: "XÁC NHẬN?",
      message: "Bạn có chắc chắn muốn xoá?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(Product_remove(id));
            SuccessMessage("Xoá thành công!");
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };
  return (
    <>
      <div className="pb-[500px]">
        {loading === false ? (
          <div className="pb-[300px]">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2 ml-5 mt-2">QUẢN TRỊ SẢN PHẨM</h1>
            </div>
            <div>
              <div className="text-center mt-[30px]">
                <Link to="add">
                  <button className="btn btn-primary mx-auto">Thêm Sản Phẩm</button>
                </Link>
              </div>
              <div className="mt-4">
                <table className="table table-hover mx-auto ">
                  <thead>
                    <tr className="text-center">
                      <th className="text-sm border border-black" scope="col">
                        STT
                      </th>
                      <th className="text-sm border border-black" scope="col">
                        TÊN SẢN PHẨM
                      </th>
                      <th className="text-sm border border-black" scope="col">
                        DANH MỤC
                      </th>
                      <th className="text-sm border border-black" scope="col">
                        ẢNH
                      </th>
                      <th className="text-sm border border-black" scope="col">
                        GIÁ
                      </th>
                      <th className="text-sm border border-black" scope="col">
                        GIÁ KHUYẾN MÃI
                      </th>
                      <th className="text-sm border border-black" scope="col">
                        BẢO HÀNH
                      </th>
                      <th className="text-sm border border-black" scope="col">
                        SỐ LƯỢNG
                      </th>
                      <th className="text-sm border border-black" colSpan={2} scope="col">
                        TUỲ CHỌN
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products &&
                      products.map((item, index) => {
                        return (
                          <tr key={item._id}>
                            <td
                              className="border border-black font-semibold text-center"
                              scope="row"
                            >
                              <div style={{ width: "30px" }}>{index + 1}</div>
                            </td>
                            <td
                              className="border border-black font-semibold"
                              style={{ width: "350px" }}
                            >
                              <div>{item.name}</div>
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
                              {prices(Number(item.price)).replace("VND", "Đ")}
                            </td>
                            <td className="border border-black text-center text-red-500 font-semibold">
                              {prices(Number(item.priceSale)).replace("VND", "Đ")}
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
          <div className="py-[300px]">
            <Spin className="mx-auto" color="#0d6efd" width="30px" height="30px" />
          </div>
        )}
      </div>
    </>
  );
};

export default ProductManagerPage;
