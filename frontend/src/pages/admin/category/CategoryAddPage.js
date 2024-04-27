import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Category_create } from "../../../slice/categorySlice";
import { SuccessMessage, WarningMessage } from "../../../utils/util";

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
      dispatch(Category_create(data))
        .unwrap()
        .then(() => {
          SuccessMessage("Added category successfully!");
          navigate("/admin/categories");
        });
    } else {
      WarningMessage("The category name already exists!");
    }
  };
  return (
    <div className="content-wrapper overflow-hidden">
      <div className="container mx-auto pt-5 text-center">
        <h3 className="text-center font-bold pb-4 text-xl">ADD CATEGORY</h3>
        <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
          <p className="mt-10 font-semibold">Catgory name: </p>
          <input
            type="text"
            id="category_name"
            className="border pl-2 mt-2 py-2 text-2xl checkValidate w-[400px]"
            {...register("name", { required: true })}
          />{" "}
          <br />
          <div>
            {errors.name && (
              <span className="text-red-500 font-bold">Please enter a category name!</span>
            )}
          </div>
          <input
            type="submit"
            value="ADD"
            className="px-4 py-2 text-white bg-red-600 rounded-full mt-4 mb-5 font-semibold hover:bg-red-700"
          />
        </form>
      </div>
      <div>
        <div className="text-center mt-2">
          <Link to="/admin/categories">
            <button className="btn btn-primary" type="button">
              All of the categories
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CategoryAddPage;
