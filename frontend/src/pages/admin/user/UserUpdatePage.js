import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/admin/Spinner";
import { User_read, User_update } from "../../../slice/userSlice";
import { ErrorMessage, SuccessMessage } from "../../../utils/util";

const UserUpdate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(state => state.user.loading);

  const onSubmit = data => {
    dispatch(User_update(data))
      .unwrap()
      .then(() => {
        SuccessMessage("Update user successfully!");
        navigate("/admin/users");
      });
  };

  useEffect(() => {
    dispatch(User_read(id))
      .unwrap()
      .then(data => {
        reset(data);
      })
      .catch(() => {
        ErrorMessage("Can not get user infomation");
      });
  }, [id]);

  return (
    <>
      <div className="content-wrapper">
        {loading === false ? (
          <div className="pb-[500px]">
            <div className="container mx-auto pt-5 ">
              <h3 className="text-center font-bold pb-5 pt-4 text-xl">UDAPTE USER</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <div style={{ marginLeft: "530px" }}>
                    <p className="mb-2 font-semibold">
                      <i className="fas fa-user-tag mr-2" />
                      Full Name
                    </p>
                    <input
                      {...register("name", { required: true })}
                      className="px-2 py-1 rounded-md form-control checkValidate"
                      style={{ width: "330px" }}
                      type="text"
                      id="fullname"
                    />

                    <p className="mb-2 mt-4 font-semibold">
                      <i className="fas fa-user-circle mr-2" />
                      Email
                    </p>
                    <input
                      {...register("email", { required: true })}
                      className="px-2 py-1 rounded-md checkValidate border"
                      style={{ width: "330px" }}
                      type="email"
                      id="email"
                      disabled
                    />
                  </div>
                </div>
                <div style={{ marginLeft: "530px" }}>
                  <p className=" mt-4 font-semibold">
                    <i className="fas fa-user-shield mr-2" />
                    Permission
                  </p>
                  <select
                    {...register("permission", { required: true })}
                    id="permission"
                    className="w-64 mt-2 h-10 rounded-md form-control"
                    style={{ width: "330px" }}
                  >
                    <option value="0">Admintrator</option>
                    <option value="1">User</option>
                  </select>
                </div>
                <div
                  id="alert"
                  className="mt-3 text-center mx-auto"
                  style={{ width: "350px" }}
                  role="alert"
                />
                <div className="text-center mt-3">
                  <input
                    className="mb-4 px-5 py-1 rounded-lg font-semibold bg-blue-500 btn btn-primary"
                    type="submit"
                    value="UPDATE"
                    id="btn_signup"
                    style={{ marginTop: "20px" }}
                  />
                </div>
              </form>
            </div>
            <div>
              <div className="text-center mt-2">
                <Link to="/admin/users">
                  <button className="btn btn-primary" type="button">
                    List all
                  </button>
                </Link>
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

export default UserUpdate;
