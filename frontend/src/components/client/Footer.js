import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="footer bg-white">
        <div className=" mx-auto mb-8 pt-8 grid grid-cols-4 gap-6 w-[1200px]">
          <div>
            <h3 className="font-bold">CÔNG TY TNHH TIN HỌC CÔNG NGHỆ AZ VIỆT NAM</h3>
            <p className="text-sm mt-1">Địa chỉ: Số 18, ngõ 121, Thái Hà, Đống Đa, Hà Nội</p>
            <p className="text-sm mt-1">Hotline: 09865.02468</p>
            <p className="text-sm mt-1">Email: hotrolaptopaz@gmail.com</p>
            <p className="mt-2">
              <span className="text-3xl text-blue-600">
                <i className="fab fa-facebook-square" />
              </span>{" "}
              <span className="text-3xl text-red-600 ml-3">
                <i className="fab fa-youtube-square" />
              </span>
            </p>
          </div>
          <div className="ml-5">
            <h3 className="font-bold">THÔNG TIN CÔNG TY</h3>
            <p className="text-sm mt-2">Giới thiệu công ty</p>
            <p className="text-sm mt-1">Tuyển dụng</p>
            <p className="text-sm mt-1">Gửi góp ý, khiếu nại</p>
            <img
              className="mt-8"
              src="https://laptopaz.vn/template/temp_2019/images/bct.png"
              alt=""
            />
          </div>
          <div>
            <h3 className="font-bold">CHÍNH SÁCH CÔNG TY</h3>
            <p className="text-sm mt-4">Chính sách chất lượng</p>
            <p className="text-sm mt-2">Chính sách bảo hành</p>
            <p className="text-sm mt-2">Chính sách đổi trả</p>
            <p className="text-sm mt-2">Chính sách bảo mật thông tin</p>
            <p className="text-sm mt-2">Chính sách khách hàng thân thiết</p>
          </div>
          <div>
            <div className="grid grid-cols-5 bg-blue-600 px-2 py-2">
              <div className="col-span-1 flex items-center mx-auto">
                <span className="text-3xl text-white">
                  <i className="fas fa-phone-volume" />
                </span>
              </div>
              <div className="col-span-4 text-white text-sm font-medium">
                <p>GỌI MUA HÀNG</p>
                <p>09865.02468</p>
              </div>
            </div>
            <div className="grid grid-cols-5 bg-green-600 px-2 py-2 mt-2">
              <div className="col-span-1 flex items-center mx-auto">
                <span className="text-3xl text-white">
                  <i className="fas fa-phone-volume" />
                </span>
              </div>
              <div className="col-span-4 text-white text-sm font-medium">
                <p>GỌI KHIẾU NẠI, GÓP Ý</p>
                <p>09865.02468</p>
              </div>
            </div>
            <div className="grid grid-cols-5 bg-yellow-500 px-2 py-2 mt-2">
              <div className="col-span-1 flex items-center mx-auto">
                <span className="text-3xl text-white">
                  <i className="fas fa-phone-volume" />
                </span>
              </div>
              <div className="col-span-4 text-white text-sm font-medium">
                <p>GỌI BẢO HÀNH</p>
                <p>0989.52.4004</p>
              </div>
            </div>
            <div className="grid grid-cols-5 bg-red-600 px-2 py-2 mt-2">
              <div className="col-span-1 flex items-center mx-auto">
                <span className="text-3xl text-white">
                  <i className="fas fa-phone-volume" />
                </span>
              </div>
              <div className="col-span-4 text-white text-sm font-medium">
                <p>HỖ TRỢ KỸ THUẬT</p>
                <p>0989.52.4004</p>
              </div>
            </div>
          </div>
        </div>
        <hr className=" mx-auto" style={{ width: "1200px" }} />
        <p className="text-center my-3 text-sm">
          <span className="font-semibold">@ Laptopaz.</span> All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
