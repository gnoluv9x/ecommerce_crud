import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ForgotPassword } from "../slice/authSlice";
import { ErrorMessage, SuccessMessage } from "../utils/util";

function FotgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const forgotPasswordLoading = useSelector(state => state.auth.forgotpassword.loading);

  const onSubmit = data => {
    dispatch(ForgotPassword(data))
      .unwrap()
      .then(result => {
        if (result?.status) {
          SuccessMessage(result?.message, 6000);
          navigate("/signin");
        } else {
          throw result?.message;
        }
      })
      .catch(err => {
        ErrorMessage(err.response.data.message);
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
        <h2 className="text-center pt-5 text-3xl font-semibold">FORGOT PASSWORD</h2>
        <div className="mx-4 mt-3 text-center text-gray-600">
          Please fill in the email you want to reset your password, we will send you a new password.
        </div>
        <div className="ml-32">
          <p className="mb-1">
            <i className="fas fa-user mr-2" />
            Email
          </p>
          <input
            className="px-2 py-1 rounded-md"
            {...register("email", { required: true })}
            style={{ width: "330px" }}
            placeholder="Example: abc@def.com"
            type="email"
            id="email"
          />
          {errors.email && <p className="text-red-500 font-bold">Please enter email!</p>}
        </div>
        <div className="text-center">
          <button
            id="btn_signin"
            disabled={forgotPasswordLoading}
            type="submit"
            className="text-white my-3 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-4 py-1 text-center inline-flex items-center disabled:cursor-wait disabled:bg-blue-300"
          >
            {forgotPasswordLoading && (
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            )}
            Send request
          </button>
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
              Signup
            </Link>
          </div>
          <div className="hover:bg-gray-300 py-2">
            <Link to="/signin" className="font-semibold w-full h-full inline-block">
              Signin
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FotgotPassword;
