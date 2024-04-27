import React from "react";

const Footer = () => {
  return (
    <div className="footer bg-white">
      <div className=" mx-auto mb-8 pt-8 grid grid-cols-4 gap-6 w-[1200px]">
        <div>
          <h3 className="font-bold">AZ VIETNAM TECHNOLOGY INFORMATICS COMPANY LIMITED</h3>
          <p className="text-sm mt-1">Address: No. 18, Lane 121, Thai Ha, Dong Da, Hanoi</p>
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
          <h3 className="font-bold">COMPANY INFORMATION</h3>
          <p className="text-sm mt-2">Company introduction</p>
          <p className="text-sm mt-1">Recruitment</p>
          <p className="text-sm mt-1">Send comments and complaints</p>
          <img
            className="mt-8"
            src="https://laptopaz.vn/template/temp_2019/images/bct.png"
            alt=""
          />
        </div>
        <div>
          <h3 className="font-bold">COMPANY POLICY</h3>
          <p className="text-sm mt-4">Quality policy</p>
          <p className="text-sm mt-2">Warranty policy</p>
          <p className="text-sm mt-2">Return policy</p>
          <p className="text-sm mt-2">Information security policy</p>
          <p className="text-sm mt-2">Loyalty policy</p>
        </div>
        <div>
          <div className="grid grid-cols-5 bg-blue-600 px-2 py-2">
            <div className="col-span-1 flex items-center mx-auto">
              <span className="text-3xl text-white">
                <i className="fas fa-phone-volume" />
              </span>
            </div>
            <div className="col-span-4 text-white text-sm font-medium">
              <p>CALL FOR BUYING</p>
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
              <p>CALL FOR COMPLAINTS AND COMMENTS</p>
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
              <p>CALL FOR WARRANTY</p>
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
              <p>TECHNICAL SUPPORT</p>
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
  );
};

export default Footer;
