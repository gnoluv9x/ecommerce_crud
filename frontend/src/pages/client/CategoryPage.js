import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import productApi from "../../api/productApi";
import categoryApi from "../../api/categoryApi";
import Categories from "../../components/client/Categories";
import ListProduct from "../../components/client/ListProduct";

export default function CategoryPage() {
  const { id: idCategory } = useParams();
  const [category, setCategory] = useState("");
  useEffect(() => {
    const getCategory = async () => {
      const { data } = await categoryApi.read(idCategory);
      setCategory(data);
    };
    getCategory();
  }, [idCategory]);

  const [productsByCategory, setProductsByCategory] = useState([]);
  useEffect(() => {
    const getProductsByCategory = async () => {
      const { data } = await productApi.productByCategory(idCategory);
      setProductsByCategory(data);
    };
    getProductsByCategory();
  }, [idCategory]);

  return (
    <>
      <ToastContainer />
      <div className="content bg-gray-100 pb-8" id="content">
        <div className=" mx-auto grid grid-cols-4 gap-8 pt-5" style={{ width: "1200px" }}>
          <aside className="col-span-1 bg-gray-100">
            <Categories></Categories>
            <div id="sticky" className="mt-8 sticky top-[30px]">
              <img
                className="shadow-md transition duration-500 ease-in-out transform hover:scale-95"
                src="https://laptopaz.vn/media/banner/23_Octce2f48fdc627f6f62b233347a2d4e707.jpg"
                alt=""
              />
              <img
                className="shadow-md mt-10 transition duration-500 ease-in-out transform hover:scale-95"
                src="https://laptopaz.vn/media/banner/11_Oct876d50f755e454ecda95d81a959c3685.jpg"
                alt=""
              />
            </div>
          </aside>
          <div className="col-span-3">
            <h5 className="mt-1">
              <span>
                <i className="fas fa-laptop" /> Sản phẩm
              </span>
              <i className="fas fa-angle-double-right text-xs px-1" />
              <span className="text-blue-600 font-semibold text-sm">{category.name}</span>
            </h5>
            <div>
              {productsByCategory.length !== 0 ? (
                <ListProduct data={productsByCategory} />
              ) : (
                <div className=" text-center mx-48 mt-20">
                  <div className="text-4xl font-semibold">
                    Không có sản phẩm <i className="far fa-sad-tear"></i>
                  </div>
                  <div className="mt-[20px]">
                    <Link to="/">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-blue-700 rounded">
                        Trang chủ
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <Footer></Footer> */}
    </>
  );
}
