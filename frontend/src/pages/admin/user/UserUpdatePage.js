import React, { useEffect, useState } from "react";
import Spin from "react-cssfx-loading/lib/Spin";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import userApi from "../../../api/userApi";
import { User_read, User_update } from "../../../slice/userSlice";
import { SuccessMessage } from "../../../utils/util";

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
  useEffect(() => {
    dispatch(User_read(id));
  }, [id]);
  const userCurrent = useSelector(state => state.user.data.user);
  const loading = useSelector(state => state.user.loading);
  const [user, setUser] = useState();
  useEffect(() => {
    const getUser = async () => {
      const { data } = await userApi.read(id);
      setUser(data);
      reset(data);
    };
    getUser();
  }, []);

  const onSubmit = data => {
    console.log(data);
    dispatch(User_update(data));
    SuccessMessage("Cập nhật người dùng thành công!");
    setTimeout(() => {
      navigate("/admin/users");
    }, 1500);
  };
  return (
    <>
      <div className="content-wrapper pb-[300px]">
        {loading === false ? (
          <div className="pb-[500px]">
            <div className="container mx-auto pt-5 ">
              <h3 className="text-center font-bold pb-5 pt-4 text-xl">SỬA USER</h3>
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
                      defaultValue="${user.name}"
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
                      defaultValue="${user.email}"
                      disabled
                    />
                  </div>
                </div>
                <div style={{ marginLeft: "530px" }}>
                  <p className=" mt-4 font-semibold">
                    <i className="fas fa-user-shield mr-2" />
                    Quyền hạn
                  </p>
                  <select
                    {...register("permission", { required: true })}
                    id="permission"
                    className="w-64 mt-2 h-10 rounded-md form-control"
                    style={{ width: "330px" }}
                  >
                    <option value="0">Quản trị viên</option>
                    <option value="1">Khách hàng</option>
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
                    value="CẬP NHẬT"
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
                    Danh sách USER{" "}
                  </button>
                </Link>
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

export default UserUpdate;
