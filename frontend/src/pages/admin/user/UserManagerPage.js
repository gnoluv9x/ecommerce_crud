import React, { useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../../../components/admin/Spinner";
import { User_list, User_remove } from "../../../slice/userSlice";
import { ErrorMessage, SuccessMessage, WarningMessage } from "../../../utils/util";

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
      title: "CONFIRM?",
      message: "Are you sure you want to delete?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(User_remove(id))
              .unwrap()
              .then(resp => {
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
  return (
    <>
      <div className="h-100">
        {loading === false ? (
          <div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2 ml-5 mt-2">USER MANAGEMENT </h1>
            </div>
            <div>
              <div className="pb-10 mt-5">
                <table className="table mx-auto text-center" style={{ maxWidth: "900px" }}>
                  <thead>
                    <tr className="text-center">
                      <th scope="col">INDEX</th>
                      <th scope="col">NAME</th>
                      <th scope="col">EMAIL</th>
                      <th scope="col">PERMISSION</th>
                      <th className="text-center" colSpan={2} scope="col">
                        ACTIONS
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
                                {item.permission === 0 ? "Admintrator" : "Customer"}
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
                                      WarningMessage("Can not delete ADMINTRATOR account!");
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
          <Spinner />
        )}
      </div>
    </>
  );
};

export default UserManagerPage;
