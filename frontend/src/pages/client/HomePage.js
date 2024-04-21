import React, { useEffect, useState } from "react";
import productApi from "../../api/productApi";
import Banner from "../../components/client/Banner";
import Categories from "../../components/client/Categories";
import ListProduct from "../../components/client/ListProduct";

export default function HomePage() {
  // const dispatch = useDispatch();

  // const productsByStore = useSelector((state) => {
  //     return state.product.data.products
  // })

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await productApi.list();
      setProducts(data);
    };
    getProducts();
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
      console.log(data);
      setProducts(data);
    };
    filterProducts();
  };
  return (
    <>
      <Banner></Banner>
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
                src="https://laptopaz.vn/media/banner/11_Oct876d50f755e454ecda95d81a959c3685.jpg"
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
                <option value="asc"> --- Sắp xếp sản phẩm --- </option>
                <option value="asc">Giá từ thấp đến cao</option>
                <option value="desc">Giá từ cao đến thấp</option>
              </select>
              <select
                onChange={handleFilter}
                className="form-control rounded-md font-semibold px-3 ml-3"
                id="filter"
                style={{ width: "250px" }}
              >
                <option value="0-990000000"> --- Lọc sản phẩm theo giá --- </option>
                <option value="0-15000000">Dưới 15 triệu đồng</option>
                <option value="15000000-30000000">15 triệu - 30 triệu</option>
                <option value="30000000-40000000">30 triệu - 40 triệu</option>
                <option value="40000000-990000000">Trên 40 triệu đồng</option>
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
