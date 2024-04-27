import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "@firebase/storage";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/admin/Spinner";
import "../../../firebase/index";
import { Category_list } from "../../../slice/categorySlice";
import { Product_read, Product_update } from "../../../slice/productSlice";
import { SuccessMessage } from "../../../utils/util";

const ProductUpdatePage = () => {
  const categories = useSelector(state => state.category.data);
  const product = useSelector(state => state.product.data.product);
  const loading = useSelector(state => state.product.loading);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = data => {
    if (typeof data.image === "object") {
      const img = data.image[0];
      const storage = getStorage();
      const storageRef = ref(storage, `images/${img.name}`);
      const UploadTask = uploadBytesResumable(storageRef, img);
      uploadBytes(storageRef, img).then(() => {
        getDownloadURL(UploadTask.snapshot.ref).then(url => {
          data.image = url;
          dispatch(Product_update(data))
            .unwrap()
            .then(() => {
              SuccessMessage("Add product successfully");
              navigate("/admin/products");
            });
        });
      });
    } else {
      dispatch(Product_update(data))
        .unwrap()
        .then(() => {
          SuccessMessage("Update product successfully!");
          navigate("/admin/products");
        });
    }
  };

  useEffect(() => {
    dispatch(Product_read(id));
    dispatch(Category_list());
  }, []);

  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product]);

  return (
    <div>
      {loading === false ? (
        <div className="content-wrapper overflow-hidden mb-10">
          <div className="container mx-auto pt-5">
            <h3 className="text-center font-bold pb-4 text-xl">UPDATE PRODUCT</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2">
                <div className="ml-48">
                  <p className="font-semibold">PRODUCT CATEGORY</p>
                  <select
                    autoFocus
                    {...register("category", { required: true })}
                    className="form-control border border-black px-2"
                    id="product_category"
                    style={{ width: "465px" }}
                  >
                    {categories &&
                      categories.map(item => {
                        return (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        );
                      })}
                  </select>
                  <div>
                    {errors.category && (
                      <span className="text-red-500 font-bold">Please choose product category</span>
                    )}
                  </div>
                  <p className="font-semibold mt-3">PRODUCT NAME:</p>
                  <textarea
                    className="px-2 form-control checkValidate"
                    {...register("name", { required: true })}
                    id="product_name"
                    cols={60}
                    rows={3}
                    style={{ width: "465px" }}
                  />
                  <div>
                    {errors.name && (
                      <span className="text-red-500 font-bold">Please enter product name</span>
                    )}
                  </div>

                  <p className="font-semibold mt-3">IMAGE</p>
                  <img src={product?.image} className="w-[170px]" alt="" />
                  <input
                    type="file"
                    className="checkValidate"
                    {...register("image")}
                    id="product_image"
                  />
                  <div>
                    {errors.image && !product?.image && (
                      <span className="text-red-500 font-bold">Please choose an image</span>
                    )}
                  </div>
                </div>
                <div className="ml-24" style={{ width: "700px" }}>
                  <p className="font-semibold">PRICE</p>
                  <input
                    type="number"
                    className="px-2 form-control checkValidate"
                    {...register("price", { required: true })}
                    id="product_price"
                    style={{ width: "465px", height: "30px" }}
                  />
                  <div>
                    {errors.price && (
                      <span className="text-red-500 font-bold">Please enter price</span>
                    )}
                  </div>

                  <p className="font-semibold mt-3">PROMOTION PRICE</p>
                  <input
                    type="number"
                    className="px-2 form-control checkValidate"
                    {...register("priceSale", { required: true })}
                    id="product_priceSale"
                    style={{ width: "465px", height: "30px" }}
                  />
                  <div>
                    {errors.priceSale && (
                      <span className="text-red-500 font-bold">
                        Please enter an promotion price
                      </span>
                    )}
                  </div>

                  <p className="font-semibold mt-3">WARRANTY (MONTHS)</p>
                  <input
                    type="number"
                    className="px-2 form-control checkValidate"
                    {...register("guarantee", { required: true })}
                    id="product_guarantee"
                    style={{ width: "465px", height: "30px" }}
                  />
                  <div>
                    {errors.guarantee && (
                      <span className="text-red-500 font-bold">Please enter warranty</span>
                    )}
                  </div>

                  <p className="font-semibold mt-3">QUANTITY</p>
                  <input
                    type="number"
                    className="px-2 form-control checkValidate"
                    {...register("quantity", { required: true })}
                    id="product_quantity"
                    style={{ width: "465px", height: "30px" }}
                  />
                  <div>
                    {errors.quantity && (
                      <span className="text-red-500 font-bold">Please enter quantity</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <input
                  id="btn_add"
                  className="text-center px-3 py-2 my-4 text-white bg-red-600 rounded-full font-semibold hover:bg-red-700"
                  type="submit"
                  value="UPDATE PRODUCT"
                />
              </div>
            </form>
          </div>
          <div>
            <div className="text-center">
              <Link to="/admin/products">
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
  );
};

export default ProductUpdatePage;
