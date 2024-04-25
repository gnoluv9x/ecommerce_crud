import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import productApi from "../../api/productApi";
import Categories from "../../components/client/Categories";
import ProductItem from "../../components/client/ProductItem";
import { SuccessMessage, addToCart, prices } from "../../utils/util";

const ProductDetail = () => {
  const { id: idProduct } = useParams();

  const [product, setProduct] = useState({});
  const [productsRelated, setProductsRelated] = useState([]);

  useEffect(() => {
    const getProductById = async () => {
      const { data } = await productApi.read(idProduct);
      console.log(data);
      setProduct(data);
    };
    getProductById();
  }, [idProduct]);

  useEffect(() => {
    const getProductsRelated = async () => {
      const { data } = await productApi.relateProduct(idProduct);
      console.log(data);
      setProductsRelated(data);
    };
    getProductsRelated();
  }, [idProduct]);

  return (
    <div>
      <div className="content bg-gray-100 pb-8 pt-5">
        <div className=" mx-auto grid grid-cols-4 gap-5 w-[1200px]">
          <aside className="col-span-1 bg-gray-100">
            {/* <Categories></Categories> */}
            <div className="">
              <img
                className="shadow-md transition duration-500 ease-in-out transform hover:scale-95"
                src="https://laptopaz.vn/media/banner/23_Octce2f48fdc627f6f62b233347a2d4e707.jpg"
                alt=""
              />
            </div>
          </aside>
          <div className="col-span-3 bg-white shadow-md pb-4">
            <h3 className="font-bold text-lg mt-4 ml-4">{product && product.name}</h3>
            <hr className="mt-3" />
            <div className="grid grid-cols-11">
              <div className="col-span-5" style={{ width: "400px", height: "350px" }}>
                <img className="h-full mt-12 mx-auto" src={product && product.image} alt="" />
              </div>
              <div className="col-span-6 mt-4">
                <span className="text-red-500 text-3xl font-bold">
                  {prices(Number(product && product.priceSale)).replace("VND", "₫")}
                </span>{" "}
                <span className="text-lg text-gray-500 font-bold  ml-3 italic line-through">
                  {prices(Number(product && product.price)).replace("VND", "₫")}
                </span>
                <p className="text-sm mt-2">
                  <span className="font-semibold">Bảo hành: </span>
                  <span className="text-lg font-bold">{product && product.guarantee}</span>
                </p>
                <p className="text-sm mt-1">
                  <span className="font-semibold">Số lượng trong kho: </span>
                  <span className="text-lg font-bold">{product && product.quantity}</span>
                </p>
                {product.quantity < 1 && (
                  <div className="mt-1 text-sm font-semibold text-red-600">Hết hàng</div>
                )}
                <p className="text-sm mt-4">
                  <span className="text-base text-green-500">
                    <i className="fas fa-check-square" />
                  </span>{" "}
                  Hàng Mới Về
                </p>
                <p className="text-sm">
                  <span className="text-base text-green-500">
                    <i className="fas fa-check-square" />
                  </span>{" "}
                  Mua hàng trước 15/01/2025 Giảm ngay 1.000.000 vnđ
                </p>
                <div className="mt-3">
                  <button
                    className={`bg-red-500 rounded-lg text-center w-[430px] disabled:bg-red-400 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-75`}
                    disabled={product.quantity < 1}
                    onClick={() => {
                      addToCart(
                        product._id,
                        product.name,
                        product.image,
                        product.priceSale,
                        product.quantity
                      );
                      SuccessMessage("Thêm sản phẩm vào giỏ hàng thành công!");
                    }}
                  >
                    <p className="text-white font-bold text-lg pt-1">Thêm vào giỏ hàng</p>
                    <p className="text-white font-semibold text-sm mt-1 pb-2">
                      Giao tận nơi hoặc nhận ở cửa hàng
                    </p>
                  </button>
                  <div className="grid grid-cols-2 gap-2 mt-3" style={{ width: "430px" }}>
                    <div className="bg-blue-500 rounded-lg text-center ml-1 hover:bg-blue-900">
                      <Link to="/">
                        <p className="text-white font-bold text-sm pt-1">TRẢ GÓP % QUA THẺ</p>
                        <p className="text-white text-xs mt-1 pb-1">Visa, Master Card, JCB</p>
                      </Link>
                    </div>
                    <div className="bg-blue-500 rounded-lg text-center mr-1 hover:bg-blue-900">
                      <Link to="/">
                        <p className="text-white font-bold text-sm pt-1">ĐĂNG KÝ TRẢ GÓP</p>
                        <p className="text-white text-xs mt-1 pb-1">
                          Xét duyệt nhanh qua điện thoại
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 mt-20">
              <div>
                <div
                  className="border border-green-400 rounded-lg relative py-6 ml-10"
                  style={{ width: "430px" }}
                >
                  <div
                    className="bg-green-400 rounded-full absolute"
                    style={{ top: "-17px", left: "20px" }}
                  >
                    <p className="py-1 px-3">
                      <span>
                        <i className="fas fa-gift" />
                      </span>{" "}
                      Quà tặng/Khuyến mãi
                    </p>
                  </div>
                  <p className="text-sm mt-2 ml-6 text-xs">
                    <span className="text-green-400 text-xs">
                      <i className="fas fa-check-circle" />
                    </span>{" "}
                    Tặng Windows 10 bản quyền theo máy
                  </p>
                  <p className="text-sm mt-2 ml-6 text-xs">
                    <span className="text-green-400 text-xs">
                      <i className="fas fa-check-circle" />
                    </span>{" "}
                    Miễn phí cân màu màn hình công nghệ cao
                  </p>
                  <p className="text-sm mt-2 ml-6 text-xs">
                    <span className="text-green-400 text-xs">
                      <i className="fas fa-check-circle" />
                    </span>{" "}
                    Balo thời trang + túi chống sốc cao cấp
                  </p>
                  <p className="text-sm mt-2 ml-6 text-xs">
                    <span className="text-green-400 text-xs">
                      <i className="fas fa-check-circle" />
                    </span>{" "}
                    Chuột không dây + Bàn di cao cấp chính hãng
                  </p>
                  <p className="text-sm mt-2 ml-6 text-xs">
                    <span className="text-green-400 text-xs">
                      <i className="fas fa-check-circle" />
                    </span>{" "}
                    Tặng gói cài đặt, bảo dưỡng chăm sóc máy trọn đời
                  </p>
                  <p className="text-sm mt-2 ml-6 text-xs">
                    <span className="text-green-400 text-xs">
                      <i className="fas fa-check-circle" />
                    </span>{" "}
                    Tặng Voucher giảm giá cho lần mua tiếp theo
                  </p>
                </div>
              </div>
              <div>
                <div
                  className="border border-gray-500 rounded-lg relative py-4 ml-12"
                  style={{ width: "350px" }}
                >
                  <h4 className="text-base text-center text-red-500 mt-[7px]">
                    YÊN TÂM MUA SẮM TẠI LAPTOPAZ
                  </h4>
                  <p className="text-sm mt-[6px] ml-3 text-base">
                    <span className="text-yellow-500 text-base mr-2">
                      <i className="fas fa-star" />
                    </span>{" "}
                    Chất lượng sản phẩm là hàng đầu
                  </p>
                  <p className="text-sm mt-[6px] ml-3 text-base">
                    <span className="text-yellow-500 text-base mr-2">
                      <i className="fas fa-star" />
                    </span>{" "}
                    Dùng test máy 15 ngày đầu lỗi 1 đổi 1
                  </p>
                  <p className="text-sm mt-[6px] ml-3 text-base">
                    <span className="text-yellow-500 text-base mr-2">
                      <i className="fas fa-star" />
                    </span>{" "}
                    Hỗ trợ và hậu mãi sau bán hàng tốt nhất
                  </p>
                  <p className="text-sm mt-[6px] ml-3 text-base">
                    <span className="text-yellow-500 text-base mr-2">
                      <i className="fas fa-star" />
                    </span>{" "}
                    Trả góp lãi suất 0% qua thẻ visa
                  </p>
                  <p className="text-sm mt-[6px] ml-3 text-base">
                    <span className="text-yellow-500 text-base mr-2">
                      <i className="fas fa-star" />
                    </span>{" "}
                    Giao hàng toàn quốc nhanh nhất
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 mx-auto bg-white shadow-md" style={{ width: "1200px" }}>
          <h4 className="font-bold text-lg mt-4 pl-4 py-2 border-b">Sản phẩm liên quan</h4>
          <div className="mx-auto grid grid-cols-3 gap-8 text-center mt-8 pb-8 px-8">
            {productsRelated.map(item => {
              return <ProductItem key={item._id} product={item} className="" />;
            })}
          </div>
        </div>
      </div>

      {/* <Footer></Footer> */}
    </div>
  );
};

export default ProductDetail;
