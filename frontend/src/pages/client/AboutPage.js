import React from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="div-content bg-gray-100 pb-8">
      <div className="content bg-white mx-auto pb-3 px-3 pt-4 max-w-[1200px]">
        <div className="content1">
          <h2 className="text-3xl font-semibold uppercase ">INTRODUCE</h2>
          <h4 className="text-lg font-semibold mt-3">
            AZ VIETNAM TECHNOLOGY INFORMATICS COMPANY LIMITED -{" "}
            <span className="text-blue-500">LAPTOP</span>
            <span className="text-red-500">AZ</span>
          </h4>
          <p className="mt-4">
            LaptopAZ, a brand selling laptops and genuine laptop components, was established and
            launched retail operations since 2008.
          </p>
          <p className="mt-4">
            Proud to be one of the leading units in the field of laptop and component business
            laptop in Hanoi, With 12 years of experience, following the motto "Prestige on each
            product" With more than 30,000 loyal customers, we are committed to all laptop products
            sold They all have the best quality on the market today. All laptops in the showroom are
            Standard warranty only according to the company's regulations.
          </p>
          <p className="mt-4">
            With a variety of laptop brands that consumers choose the most, they are diverse many
            product designs. Laptops Dell, HP, Lenovo, Thinjkpad, Asus, MSI, Acer, Macbook... Gaming
            laptops, graphics laptops, thin high-end business laptops, affordable office laptops
            Cheap, genuine laptop components...
          </p>
          <p className="mt-4">
            With many years of experience in the profession along with a team of dedicated
            professional engineers LaptopAZ always strives to bring customers the best quality
            products, Best warranty and support, most competitive price, worth it every amount of
            money the customer spends.
          </p>
          <p className="mt-4">
            If you are still having difficulty choosing a suitable laptop for yourself If you need
            to use it, please come to No. 18, Lane 121, Thai Ha, Dong Da, LaptopAZ showroom to
            Experience the products and choose for yourself the most suitable products that best
            meet your needs Need to use and worth the money I spent 💯
          </p>
          <h5 className="font-bold mt-3">Current services provided by LaptopAZ:</h5>
          <p className="mt-2">
            - Wholesale and retail of used and new laptop products (imported, genuine)
          </p>
          <p>
            - Wholesale and retail of genuine laptop components and accessories with 12 to 36 month
            warranty such as RAM, Hard drive, screen, Battery, charger, keyboard...
          </p>
          <h5 className="font-bold mt-3">LaptopAZ's commitment to customers:</h5>
          <p className="mt-2">- Putting customers at the center of all thoughts and actions</p>
          <p>
            - Guaranteed 100% original products, the most perfect quality, committed to not selling
            the device has been repaired.
          </p>
          <p>
            - Only bring customers genuine products that meet our standards production, do not sell
            poor quality products, do not sell fake/imitation goods, do not sell goods unknown
            origin.
          </p>
          <p>- The selling price of the product matches the quality and is competitive</p>
          <p>- Committed to providing the best policies and services.</p>
          <p className="mt-3">
            LaptopAZ.vn is pleased to serve you on your path to discovering technology products!
          </p>
          <p className="font-semibold">==============</p>
          <h4 className="text-lg font-semibold mt-3">
            AZ VIETNAM TECHNOLOGY INFORMATICS COMPANY LIMITED -{" "}
            <span className="text-blue-500">LAPTOP</span>
            <span className="text-red-500">AZ</span>
          </h4>
          <p>
            <span className="font-semibold">Business registration number:</span> 01008956087 -
            Issued by Hanoi Department of Planning and Investment October 23, 2019
          </p>
          <p> 🏪 Address: No. 18, Lane 121, Thai Ha, Dong Da, Hanoi</p>
          <p>📲 Sales: 09865.02468 - 08586.02468</p>
          <p>📲 Technical: 08289.02468 - 0989.52.4004</p>
          <p>
            🌐 Website:{" "}
            <Link className="hover:text-blue-500" to="/">
              https://laptopaz.vn/
            </Link>
          </p>
          <p>
            <span className="text-lg" style={{ marginLeft: "2px" }}>
              <i className="fab fa-facebook-square" />
            </span>{" "}
            <Link className="hover:text-blue-500" to="/">
              Facebook.com/LaptopAZ.vn
            </Link>
          </p>
          <p>
            {" "}
            <span style={{ marginLeft: "2px" }}>
              <i className="fas fa-envelope" />
            </span>
            <span> Email: </span>
            <Link to="/" className="text-blue-700 hover:text-blue-500">
              {" "}
              hotrolaptopaz@gmail.com
            </Link>
          </p>
          <p>🔴 Working hours: 8:30 a.m. - 9:30 p.m. all days of the week</p>
          <h2 className="font-bold ml-3 mt-5">IMAGES OF OUR CUSTOMERS AND ACTIVITIES</h2>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <img src="https://laptopaz.vn/media/about/2912_1d238043c6ee21b078ff.jpg" alt="" />
            <img src="https://laptopaz.vn/media/about/2912_91581b2d5d80badee391.jpg" alt="" />
            <img src="https://laptopaz.vn/media/about/2912_31b86fae51d4b68aefc5.jpg" alt="" />
            <img
              src="https://laptopaz.vn/media/about/2912_75247427_2634429743344519_6336878715129036800_o.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="content2" />
        <div className="content3" />
      </div>
    </div>
  );
};

export default AboutPage;
