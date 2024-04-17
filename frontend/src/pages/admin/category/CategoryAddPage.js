import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Category_create } from "../../../slice/categorySlice";
import { useNavigate, Link } from "react-router-dom";

function CategoryAddPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector(state => state.category.data);

  const onSubmit = data => {
    var check = 0;
    categories.forEach(category => {
      if (data.name.trim() === category.name) {
        check += 1;
      }
    });
    if (check === 0) {
      dispatch(Category_create(data));
      toast.success("Thêm danh mục thành công!");
      setTimeout(() => {
        navigate("/admin/categories");
      }, 2000);
    } else {
      toast.warning("Tên danh mục đã tồn tại!");
    }
  };
  return (
    <>
      <ToastContainer />
      <div>
        <div className="content-wrapper pb-[360px]">
          <div className="container mx-auto pt-5 text-center">
            <h3 className="text-center font-bold pb-4 text-xl">THÊM DANH MỤC</h3>
            <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
              <p className="mt-10 font-semibold">Tên Danh mục: </p>
              <input
                type="text"
                id="category_name"
                className="border pl-2 mt-2 py-2 text-2xl checkValidate"
                {...register("name", { required: true })}
                style={{ width: "400px" }}
              />{" "}
              <br />
              <div>
                {errors.name && (
                  <span className="text-red-500 font-bold">Hãy nhập đầy đủ thông tin!</span>
                )}
              </div>
              <input
                type="submit"
                value="Thêm"
                className="px-4 py-2 text-white bg-red-600 rounded-full mt-4 mb-5 font-semibold hover:bg-red-700"
              />
            </form>
          </div>
          <div>
            <div className="text-center mt-2">
              <Link to="/admin/categories">
                <button className="btn btn-primary" type="button">
                  Tất cả danh mục
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryAddPage;
