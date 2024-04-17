import React from "react";
// import Header from '../components/client/Header';
// import Footer from '../components/client/Footer';
import Iframe from "react-iframe";
import { Link } from "react-router-dom";

const ContactPage = () => {
  return (
    <div>
      {/* <Header></Header> */}
      <div className="div-content bg-gray-100 pb-8">
        <div className="content bg-white mx-auto pb-5 px-3 pt-4" style={{ maxWidth: "1200px" }}>
          <div>
            <h2 className="text-3xl uppercase font-semibold">Liên hệ</h2>
            <div className="mx-auto mt-4">
              <Iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.863981044334!2d105.74459841475554!3d21.038127785993286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b991d80fd5%3A0x53cefc99d6b0bf6f!2sFPT%20Polytechnic%20Hanoi!5e0!3m2!1sen!2s!4v1622259329215!5m2!1sen!2s"
                width="100%s"
                height={500}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
          <div>
            <h2 className="text-2xl uppercase font-semibold text-center mt-4 mb-4">
              Liên hệ với chúng tôi
            </h2>
            <div className="grid grid-cols-2 gap-8 px-20">
              <div>
                <div className="shadow-sm">
                  <img src="https://laptopaz.vn/media/about/2912_IMG_E2367.JPG" alt="" />
                </div>
                <h4 className="font-semibold mt-8">
                  CÔNG TY TNHH TIN HỌC CÔNG NGHỆ AZ VIỆT NAM -{" "}
                  <span className="text-blue-500">LAPTOP</span>
                  <span className="text-red-500">AZ</span>
                </h4>
                <p className="mt-4">🏪 Địa chỉ: Số 18, ngõ 121, Thái Hà, Đống Đa, TP Hà Nội</p>
                <p className="mt-4">📲 Kinh doanh: 09865.02468 - 08586.02468</p>
                <p className="mt-4">📲 Kỹ thuật: 08289.02468 - 0989.52.4004</p>
                <p className="mt-4">
                  🌐 Website:{" "}
                  <Link className="hover:text-blue-500" to="/">
                    https://laptopaz.vn/
                  </Link>
                </p>
                <p className="mt-4">
                  <span style={{ marginLeft: "2px" }}>
                    <i className="fas fa-envelope" />
                  </span>
                  <span> Email: </span>
                  <Link to="/" className="text-blue-700 hover:text-blue-500">
                    {" "}
                    hotrolaptopaz@gmail.com
                  </Link>
                </p>
                <p className="mt-4">
                  🔴 Thời gian làm việc: 8h30h - 21h30 tất cả các ngày trong tuần
                </p>
              </div>
              <div className="ml-16">
                <form>
                  <p className="font-semibold">Tên của bạn</p>
                  <input
                    className="border mt-2 bg-gray-100 form-control"
                    type="text"
                    style={{ width: "400px", height: "30px" }}
                  />
                  <p className="font-semibold mt-4">Email</p>
                  <input
                    className="border mt-2 bg-gray-100 form-control"
                    type="email"
                    style={{ width: "400px", height: "30px" }}
                  />
                  <p className="font-semibold mt-4">Số điện thoại</p>
                  <input
                    className="border mt-2 bg-gray-100 form-control"
                    type="number"
                    style={{ width: "400px", height: "30px" }}
                  />
                  <p className="font-semibold mt-4">Tiêu đề</p>
                  <input
                    className="border mt-2 bg-gray-100 form-control"
                    type="text"
                    style={{ width: "400px", height: "30px" }}
                  />
                  <p className="font-semibold mt-4">Your message (optional)</p>
                  <textarea
                    className="border bg-gray-100 form-control"
                    cols={53}
                    rows={4}
                    defaultValue={""}
                  />
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-md mt-3 hover:bg-blue-800">
                    GỬI
                  </button>
                </form>
                <div>
                  <h2 className="font-semibold mt-8">KẾT NỐI VỚI CHÚNG TÔI</h2>
                  <div className="mt-3">
                    <Link to="/">
                      <i className="text-3xl fab fa-facebook-square" />
                    </Link>
                    <Link to="/">
                      <i className="text-3xl ml-2 fab fa-instagram-square" />
                    </Link>
                    <Link to="/">
                      <i className="text-3xl ml-2 fab fa-facebook-messenger" />
                    </Link>
                    <Link to="/">
                      <i className="text-3xl ml-2 fab fa-twitter-square" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default ContactPage;
