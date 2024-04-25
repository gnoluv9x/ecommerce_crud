import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import categoryApi from "../../../api/categoryApi";
import Spinner from "../../../components/admin/Spinner";
import { Category_update } from "../../../slice/categorySlice";

const CategoryUpdatePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector(state => state.category.data);
  const loading = useSelector(state => state.category.loading);
  const [category, setCategory] = useState();
  useEffect(() => {
    const getCate = async () => {
      const { data } = await categoryApi.read(id);
      setCategory(data);
      reset({ name: data.name });
    };
    getCate();
  }, [id]);

  const onSubmit = async data => {
    let newCategory = {
      ...category,
      ...data,
    };
    var check = 0;
    categories.forEach(category => {
      if (data.name.trim() === category.name) {
        check += 1;
      }
    });
    if (check === 0) {
      dispatch(Category_update(newCategory))
        .unwrap()
        .then(() => {
          toast.success("Cập nhật danh mục thành công!");
          navigate("/admin/categories");
        });
    } else {
      toast.warning("Tên danh mục đã tồn tại!");
    }
  };

  return (
    <>
      <div className="h-100">
        {loading === false ? (
          <div className="content-wrapper overflow-hidden">
            <div className="container mx-auto pt-5 text-center">
              <h3 className="text-center font-bold pb-4 text-xl">CẬP NHẬT DANH MỤC</h3>
              <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
                <p className="mt-10 font-semibold">Tên Danh mục: </p>
                <input
                  type="text"
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
                <p className="error text-red-500 text-sm font-semibold" />
                <input
                  type="submit"
                  value="Cập nhật"
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
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default CategoryUpdatePage;
