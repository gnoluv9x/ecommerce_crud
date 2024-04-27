import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import productApi from "../../api/productApi";
import Banner from "../../components/client/Banner";
import Categories from "../../components/client/Categories";
import ListProduct from "../../components/client/ListProduct";
import { Category_list } from "../../slice/categorySlice";
import { Product_list } from "../../slice/productSlice";
import { ErrorMessage } from "../../utils/util";

export default function HomePage() {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    dispatch(Category_list());
    dispatch(Product_list())
      .unwrap()
      .then(data => {
        setProducts(data);
      })
      .catch(err => {
        console.log("Debug_here err: ", err);
        ErrorMessage("Không  nhận được danh sách sản phẩm");
      });
  }, []);

  const handleSort = e => {
    let level = e.target.value;
    const sortProducts = async () => {
      const { data } = await productApi.sortPrice(level);
      setProducts(data);
    };
    sortProducts();
  };

  const handleFilter = e => {
    let [priceMin, priceMax] = e.target.value.split("-");
    const filterProducts = async () => {
      const { data } = await productApi.filterPrice(priceMin, priceMax);
      setProducts(data);
    };
    filterProducts();
  };
  return (
    <>
      <Banner />
      <div className="content bg-gray-100 pb-8 pt-8" id="content">
        <div className=" mx-auto grid grid-cols-4 gap-8" style={{ width: "1200px" }}>
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
                src="https://shop.samsung.com/ie/images/categories/28020669/Category-Banner-Mobile-750x860%20(37).jpg"
                alt=""
              />
            </div>
          </aside>
          <div className="col-span-3">
            <div className="mx-auto flex">
              <select
                onChange={handleSort}
                className="form-control rounded-md font-semibold px-[27px]"
                id="sort"
                style={{ width: "240px" }}
              >
                <option value="asc"> --- Sort products --- </option>
                <option value="asc">Price from low to high</option>
                <option value="desc">Price from high to low</option>
              </select>
              <select
                onChange={handleFilter}
                className="form-control rounded-md font-semibold px-3 ml-3"
                id="filter"
                style={{ width: "250px" }}
              >
                <option value="0-990000000"> --- Filter products by price --- </option>
                <option value="0-15000000">Under 15 million VND</option>
                <option value="15000000-30000000">15 million - 30 million</option>
                <option value="30000000-40000000">30 million - 40 million</option>
                <option value="40000000-990000000">Over 40 million VND</option>
              </select>
            </div>
            <div id="list_product">
              {products && products.length !== 0 ? <ListProduct data={products} /> : ""}
            </div>
          </div>
        </div>
      </div>
      {/* <Footer></Footer> */}
    </>
  );
}
