import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Product_create } from "../../../slice/productSlice";
import { SuccessMessage } from "../../../utils/util";
import "../../../firebase/index";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "@firebase/storage";

const ProductAddPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector(state => state.category.data);

  const onSubmit = data => {
    const img = data.image[0];
    const storage = getStorage();
    const storageRef = ref(storage, `images/${img.name}`);

    const UploadTask = uploadBytesResumable(storageRef, img);

    uploadBytes(storageRef, img)
      .then(() => {
        getDownloadURL(UploadTask.snapshot.ref).then(url => {
          data.image = url;
          console.log(data);
          dispatch(Product_create(data));
          SuccessMessage("Thêm sản phẩm thành công!");
          setTimeout(() => {
            navigate("/admin/products");
          }, 1500);
        });
      })
      .catch(err => {
        console.log("Debug_here err: ", err);
      });
  };
  return (
    <>
      <div>
        <div className="content-wrapper pb-[360px] overflow-hidden">
          <div className="container mx-auto pt-5">
            <h3 className="text-center font-bold pb-4 text-xl">THÊM SẢN PHẨM</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2">
                <div className="ml-48">
                  <p className="font-semibold">DANH MỤC SẢN PHẨM</p>
                  <select
                    autoFocus
                    {...register("category", { required: true })}
                    className="form-control border border-black px-2"
                    id="product_category"
                    style={{ width: "465px" }}
                  >
                    {categories.map(item => {
                      return (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  <div>
                    {errors.category && (
                      <span className="text-red-500 font-bold">Hãy nhập đầy đủ thông tin!</span>
                    )}
                  </div>
                  <p className="font-semibold mt-3">TÊN SẢN PHẨM:</p>
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
                      <span className="text-red-500 font-bold">Hãy nhập đầy đủ thông tin!</span>
                    )}
                  </div>

                  <p className="font-semibold mt-3">ẢNH</p>
                  <input
                    type="file"
                    className="checkValidate"
                    {...register("image", { required: true })}
                    id="product_image"
                  />
                  <div>
                    {errors.image && (
                      <span className="text-red-500 font-bold">Hãy nhập đầy đủ thông tin!</span>
                    )}
                  </div>
                </div>
                <div className="ml-24" style={{ width: "700px" }}>
                  <p className="font-semibold">GIÁ TIỀN</p>
                  <input
                    type="number"
                    className="px-2 form-control checkValidate"
                    {...register("price", { required: true })}
                    id="product_price"
                    style={{ width: "465px", height: "30px" }}
                  />
                  <div>
                    {errors.price && (
                      <span className="text-red-500 font-bold">Hãy nhập đầy đủ thông tin!</span>
                    )}
                  </div>

                  <p className="font-semibold mt-3">GIÁ KHUYẾN MÃI</p>
                  <input
                    type="number"
                    className="px-2 form-control checkValidate"
                    {...register("priceSale", { required: true })}
                    id="product_priceSale"
                    style={{ width: "465px", height: "30px" }}
                  />
                  <div>
                    {errors.priceSale && (
                      <span className="text-red-500 font-bold">Hãy nhập đầy đủ thông tin!</span>
                    )}
                  </div>

                  <p className="font-semibold mt-3">BẢO HÀNH</p>
                  <input
                    type="text"
                    className="px-2 form-control checkValidate"
                    {...register("guarantee", { required: true })}
                    id="product_guarantee"
                    style={{ width: "465px", height: "30px" }}
                  />
                  <div>
                    {errors.guarantee && (
                      <span className="text-red-500 font-bold">Hãy nhập đầy đủ thông tin!</span>
                    )}
                  </div>

                  <p className="font-semibold mt-3">SỐ LƯỢNG</p>
                  <input
                    type="number"
                    className="px-2 form-control checkValidate"
                    {...register("quantity", { required: true })}
                    id="product_quantity"
                    style={{ width: "465px", height: "30px" }}
                  />
                  <div>
                    {errors.quantity && (
                      <span className="text-red-500 font-bold">Hãy nhập đầy đủ thông tin!</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <input
                  id="btn_add"
                  className="text-center mt-5 px-3 py-2 text-white bg-red-600 rounded-full mb-5 font-semibold hover:bg-red-700"
                  type="submit"
                  value="THÊM SẢN PHẨM"
                />
              </div>
            </form>
          </div>
          <div>
            <div className="text-center mt-2">
              <Link to="/admin/products">
                <button className="btn btn-primary" type="button">
                  Tất cả sản phẩm
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductAddPage;
