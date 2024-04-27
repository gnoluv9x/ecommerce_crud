import React, { useEffect } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import productApi from "../../../api/productApi";
import Spinner from "../../../components/admin/Spinner";
import { Category_list, Category_remove } from "../../../slice/categorySlice";
import { ErrorMessage, SuccessMessage, WarningMessage } from "../../../utils/util";

const CategoryManagerPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.category.data);
  const loading = useSelector(state => state.category.loading);

  const confirmRemove = id => {
    confirmAlert({
      title: "CONFIRM?",
      message: "Are you sure you want to delete?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(Category_remove(id))
              .unwrap()
              .then(() => {
                SuccessMessage("Delete successfully");
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
    dispatch(Category_list());
  }, []);

  return (
    <div className="h-100">
      {loading === false ? (
        <div className="">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2 ml-5 mt-2">CATEGORIES MANAGEMENT</h1>
          </div>
          <div>
            <div className="text-center mt-[30px]">
              <Link to="add">
                <button className="btn btn-primary mx-auto">Add Category</button>
              </Link>
            </div>
            <table
              className="table table-hover mx-auto mt-[50px] text-center"
              style={{ width: "50%" }}
            >
              <thead>
                <tr className="text-center">
                  <th scope="col">INDEX</th>
                  <th scope="col">CATEGORY NAME</th>
                  <th className="text-center" colSpan={2} scope="col">
                    ACTIONS
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

                              if (data.length === 0) {
                                confirmRemove(item._id);
                              } else {
                                WarningMessage(
                                  "Please delete all products in this category before deleting the category!",
                                  3000
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
        <Spinner />
      )}
    </div>
  );
};

export default CategoryManagerPage;
