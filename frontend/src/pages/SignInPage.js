import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SignIn } from "../slice/authSlice";
import { SuccessMessage, WarningMessage } from "../utils/util";
import Cookies from "js-cookie";

function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = data => {
    dispatch(SignIn(data))
      .then(unwrapResult)
      .then(result => {
        if (result?.status) {
          localStorage.setItem("user", JSON.stringify(result));
          SuccessMessage("Đăng nhập thành công!");
          navigate("/");
        } else {
          throw result?.message;
        }
      })
      .catch(err => {
        WarningMessage(err.response.data.message);
      });
  };

  const handleForgotPassword = event => {
    event.stopPropagation();
  };

  useEffect(() => {
    const user = Cookies.get("accessToken");
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="container mx-auto bg-gray-200 border border-gray-300 mt-32 max-w-[600px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-center pt-5 text-3xl font-semibold">ĐĂNG NHẬP</h2>
        <div className="ml-32 mt-5">
          <p className="mb-1">
            <i className="fas fa-user mr-2" />
            Email
          </p>
          <input
            className="px-2 py-1 rounded-md"
            {...register("email", { required: true })}
            style={{ width: "330px" }}
            type="email"
            id="email"
            // autoComplete="one-time-code"
            // defaultValue="phi1@gmail.com"
          />
          {errors.email && <p className="text-red-500 font-bold">Hãy nhập email!</p>}
          <p className="mt-3  mb-1">
            <i className="fas fa-key mr-2" />
            Password
          </p>
          <input
            className="px-2 py-1 rounded-md"
            {...register("password", { required: true })}
            style={{ width: "330px" }}
            type="password"
            id="password"
            // autoComplete="one-time-code"
            // defaultValue={123456}
          />{" "}
          <br />
          {errors.password && <p className="text-red-500 font-bold">Hãy nhập mật khẩu!</p>}
        </div>
        {/* <div className="mt-2">
          <input type="checkbox" name="remember" defaultValue={1} style={{ marginLeft: "128px" }} />
          <span className="text-sm font-semibold"> Ghi nhớ đăng nhập</span>
          <br />
        </div> */}
        <div
          id="alert"
          className="mt-3 text-center mx-auto"
          style={{ width: "350px" }}
          role="alert"
        />
        <div className="text-center">
          <input
            className="mt-4 mb-4 px-4 py-1 rounded-lg font-semibold bg-blue-500 btn btn-primary"
            type="submit"
            value="ĐĂNG NHẬP"
            id="btn_signin"
          />
        </div>
        <div className="text-center">
          <Link to="/" className="hover:text-gray-300">
            <span className="mb-5 px-5 py-1 rounded-lg font-semibold bg-blue-500 mx-auto btn btn-primary">
              Trở về trang chủ
            </span>
          </Link>
        </div>
        <div className="text-center border-t border-gray-300 grid grid-cols-2">
          <div className="hover:bg-gray-300 py-2 border-r border-gray-300 ">
            <button type="button">
              <Link to="/signup" className="font-semibold">
                Đăng ký tài khoản
              </Link>
            </button>
          </div>
          <div className="hover:bg-gray-300 py-2">
            <button type="button" onClick={handleForgotPassword} className="font-semibold">
              Quên mật khẩu?
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignInPage;
