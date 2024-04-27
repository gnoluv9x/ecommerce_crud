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
          SuccessMessage("Login successfully!");
          navigate("/");
        } else {
          throw result?.message;
        }
      })
      .catch(err => {
        WarningMessage(err.response.data.message);
      });
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
        <h2 className="text-center pt-5 text-3xl font-semibold">SIGN IN</h2>
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
          />
          {errors.email && <p className="text-red-500 font-bold">Please enter email!</p>}
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
          />{" "}
          <br />
          {errors.password && <p className="text-red-500 font-bold">Please enter your password!</p>}
        </div>
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
            value="SIGN IN"
            id="btn_signin"
          />
        </div>
        <div className="text-center">
          <Link to="/" className="hover:text-gray-300">
            <span className="mb-5 px-5 py-1 rounded-lg font-semibold bg-blue-500 mx-auto btn btn-primary">
              Back to homepage
            </span>
          </Link>
        </div>
        <div className="text-center border-t border-gray-300 grid grid-cols-2">
          <div className="hover:bg-gray-300 py-2 border-r border-gray-300 ">
            <Link to="/signup" className="font-semibold w-full h-full inline-block">
              Sign up
            </Link>
          </div>
          <div className="hover:bg-gray-300 py-2">
            <Link to="/forgot-password" className="font-semibold w-full h-full inline-block">
              Forgot password
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignInPage;
