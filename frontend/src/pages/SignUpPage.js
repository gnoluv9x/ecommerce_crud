import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SignUp } from "../slice/authSlice";
import { ErrorMessage, SuccessMessage, WarningMessage } from "../utils/util";

function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = data => {
    if (data.password !== data.confirmPassword) {
      WarningMessage("Passwords do not match!", 3000);
    } else {
      delete data.confirmPassword;
      data.permission = 1;
      try {
        dispatch(SignUp(data))
          .then(unwrapResult)
          .then(resp => {
            if (resp.status) {
              SuccessMessage("Sign Up Success!", 2000);
              navigate("/signin");
            } else {
              throw resp.message;
            }
          })
          .catch(err => {
            console.log("Debug_here err: ", err);
            ErrorMessage(err || "Registration failed");
          });
      } catch (error) {
        console.log("Debug_here error: ", { error });
        WarningMessage(error.response.data.error);
      }
    }
  };

  return (
    <div
      className="container mx-auto bg-gray-200 border border-gray-300 mt-24"
      style={{ width: "600px" }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-center pt-5 text-3xl font-semibold">SIGN UP</h2>
        <div className="ml-32 mt-5">
          <p className="mb-1">
            <i className="fas fa-user-tag mr-2" />
            Full Name
          </p>
          <input
            name="name"
            className="px-2 py-1 rounded-md checkValidate"
            {...register("name", { required: true })}
            style={{ width: "330px" }}
            type="text"
            id="fullname"
          />
          {errors.name && <p className="text-red-500 font-bold">Please enter a name!</p>}
          <p className="error text-red-500 text-sm font-semibold" />
          <p className="mb-1 mt-3">
            <i className="fas fa-user-circle mr-2" />
            Email
          </p>
          <input
            name="email"
            className="px-2 py-1 rounded-md checkValidate"
            {...register("email", { required: true })}
            style={{ width: "330px" }}
            type="email"
            id="email"
          />
          {errors.email && <p className="text-red-500 font-bold">Please enter email!</p>}
          <p className="error text-red-500 text-sm font-semibold" />
          <p className="mt-3  mb-1">
            <i className="fas fa-key mr-2" />
            Password
          </p>
          <input
            name="password"
            className="px-2 py-1 rounded-md checkValidate"
            {...register("password", { required: true })}
            style={{ width: "330px" }}
            type="password"
            id="password"
            minLength={6}
          />{" "}
          <br />
          {errors.password && <p className="text-red-500 font-bold">Please enter password!</p>}
          <p className="error text-red-500 text-sm font-semibold" />
          <p className="mt-3  mb-1">
            <i className="fas fa-key mr-2" />
            Confirm Password
          </p>
          <input
            className="px-2 py-1 rounded-md checkValidate"
            {...register("confirmPassword", { required: true })}
            style={{ width: "330px" }}
            type="password"
            id="repassword"
            minLength={6}
          />{" "}
          <br />
          {errors.confirmPassword && (
            <p className="text-red-500 font-bold">Please enter password!</p>
          )}
          <p className="error text-red-500 text-sm font-semibold" />
          <p className="errorRepassword text-red-500 text-sm font-semibold mx-auto" />
        </div>
        <div
          id="alert"
          className="mt-3 text-center mx-auto"
          style={{ width: "350px" }}
          role="alert"
        />
        <div className="text-center mt-3">
          <input
            className="mb-4 mt-5 px-5 py-1 rounded-lg font-semibold bg-blue-500 btn btn-primary"
            type="submit"
            value="SIGN UP"
            id="btn_signup"
          />
        </div>
        <div className="text-center">
          <button className="mb-5 px-5 py-1 rounded-lg font-semibold bg-blue-500 mx-auto btn btn-primary">
            <Link to="/" className="hover:text-gray-300">
              Back to homepage
            </Link>
          </button>
        </div>
        <div className="text-center border-t border-gray-300">
          <div className="hover:bg-gray-300 py-2">
            <Link to="/signin" className="w-full h-full inline-block">
              Already have an account? Log in now
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUpPage;
