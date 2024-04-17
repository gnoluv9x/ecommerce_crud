import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { WarningMessage, SuccessMessage } from "../utils/util";
import { SignIn } from "../slice/authSlice";

function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async data => {
    const SignInResult = await dispatch(SignIn(data));
    // const currentUser = unwrapResult(SignInResult);
    console.log("SignInResult: ", SignInResult);

    if (SignInResult.payload.token) {
      localStorage.setItem("user", JSON.stringify(SignInResult.payload));
      SuccessMessage("Đăng nhập thành công!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      WarningMessage(SignInResult.payload.response.data.error);
    }
  };
  return (
    <div
      className="container mx-auto bg-gray-200 border border-gray-300 mt-32 "
      style={{ width: "600px" }}
    >
      <ToastContainer />
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
            defaultValue="phi1@gmail.com"
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
            defaultValue={123456}
          />{" "}
          <br />
          {errors.password && <p className="text-red-500 font-bold">Hãy nhập mật khẩu!</p>}
        </div>
        <div className="mt-2">
          <input type="checkbox" name="remember" defaultValue={1} style={{ marginLeft: "128px" }} />
          <span className="text-sm font-semibold"> Ghi nhớ đăng nhập</span>
          <br />
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
            value="ĐĂNG NHẬP"
            id="btn_signin"
          />
        </div>
        <div className="text-center">
          <button className="mb-5 px-5 py-1 rounded-lg font-semibold bg-blue-500 mx-auto btn btn-primary">
            <Link to="/" className="hover:text-gray-300">
              Trở về trang chủ
            </Link>
          </button>
        </div>
        <div className="text-center border-t border-gray-300 grid grid-cols-2">
          <div className="hover:bg-gray-300 py-2 border-r border-gray-300 ">
            <button>
              <Link to="/signup" className="font-semibold">
                Đăng ký tài khoản
              </Link>
            </button>
          </div>
          <div className="hover:bg-gray-300 py-2">
            <button className="font-semibold">Quên mật khẩu?</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignInPage;
