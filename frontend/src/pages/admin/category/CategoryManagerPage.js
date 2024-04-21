import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { WarningMessage, SuccessMessage } from "../../../utils/util";
import { Link } from "react-router-dom";
import { Category_remove } from "../../../slice/categorySlice";
import productApi from "../../../api/productApi";
import Spin from "react-cssfx-loading/lib/Spin";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const CategoryManagerPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.category.data);
  const loading = useSelector(state => state.category.loading);

  const confirmRemove = id => {
    confirmAlert({
      title: "XÁC NHẬN?",
      message: "Bạn có chắc chắn muốn xoá?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(Category_remove(id));
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
              <h1 className="h2 ml-5 mt-2">QUẢN TRỊ DANH MỤC</h1>
            </div>
            <div>
              <div className="text-center mt-[30px]">
                <Link to="add">
                  <button className="btn btn-primary mx-auto">Thêm Danh Mục</button>
                </Link>
              </div>
              <table
                className="table table-hover mx-auto mt-[50px] text-center"
                style={{ width: "50%" }}
              >
                <thead>
                  <tr className="text-center">
                    <th scope="col">STT</th>
                    <th scope="col">TÊN DANH MỤC</th>
                    <th className="text-center" colSpan={2} scope="col">
                      TUỲ CHỌN
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories &&
                    categories.map((item, index) => {
                      return (
                        <tr key={item._id}>
                          <th scope="row" style={{ width: "100px" }}>
                            {index + 1}
                          </th>
                          <td className="font-semibold" style={{ width: "480px" }}>
                            {item.name}
                          </td>
                          <td>
                            <Link
                              className="text-sm px-1 rounded-lg bg-blue-500 hover:bg-blue-700 text-white btn btn-primary"
                              to={`/admin/categories/update/${item._id}`}
                            >
                              <i className="px-1 far fa-edit" />
                            </Link>
                          </td>
                          <td>
                            <button
                              onClick={async () => {
                                let { data } = await productApi.productByCategory(item._id);
                                console.log("data: ", data);

                                if (data.length === 0) {
                                  confirmRemove(item._id);
                                } else {
                                  WarningMessage(
                                    "Hãy xoá hết sản phẩm thuộc danh mục này trước khi muốn xoá danh mục!"
                                  );
                                }
                              }}
                              className="text-sm px-1 rounded-lg bg-red-500 hover:bg-red-700 text-white btn btn-danger btn-remove"
                            >
                              <i className="px-1 fas fa-trash-alt" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
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

export default CategoryManagerPage;
