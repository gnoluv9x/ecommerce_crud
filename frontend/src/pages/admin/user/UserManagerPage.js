import React, { useEffect } from "react";
import Spin from "react-cssfx-loading/lib/Spin";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { User_list, User_remove } from "../../../slice/userSlice";
import { SuccessMessage, WarningMessage } from "../../../utils/util";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const UserManagerPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(User_list());
  }, []);
  const users = useSelector(state => state.user.data.users);
  const loading = useSelector(state => state.user.loading);
  console.log(users);

  const confirmRemove = id => {
    confirmAlert({
      title: "XÁC NHẬN?",
      message: "Bạn có chắc chắn muốn xoá?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(User_remove(id));
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
          <div className="pb-[500px]">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2 ml-5 mt-2">QUẢN TRỊ NGƯỜI DÙNG</h1>
            </div>
            <div>
              {/* <div className="text-center mt-[30px]">
                            <Link to="add">
                                <button className="btn btn-primary mx-auto">Thêm User</button>
                            </Link>
                        </div> */}
              <div className="pb-10 mt-5">
                <table className="table mx-auto text-center" style={{ maxWidth: "900px" }}>
                  <thead>
                    <tr className="text-center">
                      <th scope="col">STT</th>
                      <th scope="col">TÊN</th>
                      <th scope="col">EMAIL</th>
                      <th scope="col">QUYỀN HẠN</th>
                      <th className="text-center" colSpan={2} scope="col">
                        TUỲ CHỌN
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users &&
                      users.map((item, index) => {
                        return (
                          <tr key={item._id}>
                            <th scope="row">
                              <div>{index + 1}</div>
                            </th>
                            <td>
                              <div className="pt-1 px-5" style={{ width: "200px" }}>
                                {item.name}
                              </div>
                            </td>
                            <td>
                              <div className="pt-1 px-10">{item.email}</div>
                            </td>
                            <td>
                              <div className="pt-1 px-10">
                                {item.permission === 0 ? "QUẢN TRỊ VIÊN" : "KHÁCH HÀNG"}
                              </div>
                            </td>
                            <td style={{ width: "50px" }}>
                              <div>
                                <Link
                                  to={`/admin/users/update/${item._id}`}
                                  className="text-sm px-1 border border-gray-600 rounded-lg bg-blue-500 hover:bg-blue-700 text-white btn btn-primary"
                                >
                                  <i className="px-1 far fa-edit" />
                                </Link>
                              </div>
                            </td>
                            <td>
                              <div>
                                <button
                                  className="text-sm px-1 border border-gray-600 rounded-lg bg-red-500 hover:bg-red-700 text-white btn btn-danger btn-remove"
                                  onClick={async () => {
                                    if (item.permission === 0) {
                                      WarningMessage("Không thể xoá tài khoản của QUẢN TRỊ VIÊN!");
                                    } else {
                                      confirmRemove(item._id);
                                    }
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

export default UserManagerPage;
