import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const Banner = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <div className="bg-gray-100">
      <div className=" w-[1200px] grid grid-cols-3 mx-auto">
        <Slider className="col-span-2" {...settings}>
          <div className="h-full">
            <Link to="/">
              <img
                className="w-full"
                src="https://laptopaz.vn/media/banner/18_Mare95ffd274c039d51bb5b9fa0e7e5dbef.jpg"
                alt="banner"
              />
            </Link>
          </div>
          <div className="h-full">
            <Link to="/">
              <img
                className="w-full"
                src="https://pbs.twimg.com/media/Fxa1YWiakAAlvpg.jpg"
                alt=""
              />
            </Link>
          </div>
          <div className="h-full">
            <Link to="/">
              <img
                className="w-full"
                src="https://laptopaz.vn/media/banner/26_Apr767cc1af5767401ee423d76bc9ff4775.jpg"
                alt=""
              />
            </Link>
          </div>
          <div className="h-full">
            <Link to="/">
              <img
                className="w-full"
                src="https://www.tech-critter.com/wp-content/uploads/2022/06/MSI-Mid-Year-Sales-26-May-to-26-June-2022-featured.jpg"
                alt=""
              />
            </Link>
          </div>
          <div className="h-full">
            <Link to="/">
              <img
                className="w-full"
                src="https://laptopaz.vn/media/banner/22_Marf1a391c8c48fca0c805c17e2c743086c.jpg"
                alt=""
              />
            </Link>
          </div>
        </Slider>
        <div className="col-span-1 z-50 flex flex-col pb-3">
          <div className="flex-grow-1">
            <img
              src="https://t4.ftcdn.net/jpg/04/19/98/19/360_F_419981971_jftDSPRJGskIgVirQqtKLItcFdEZ4Zve.jpg"
              alt=""
              className="w-full h-full object-fill"
            />
          </div>
          <div className="flex-grow-1">
            <img
              src="https://img.freepik.com/free-vector/realistic-cyber-monday-twitter-header_23-2149816807.jpg?size=626&ext=jpg"
              alt=""
              className="w-full h-full object-fill"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
