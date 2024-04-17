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
  };

  return (
    <div className="bg-gray-100">
      <div className=" w-[1200px] grid grid-cols-3 mx-auto">
        <Slider className="col-span-2" {...settings}>
          <div>
            <Link to="/">
              <img
                className="w-full"
                src="https://laptopaz.vn/media/banner/29_Aug501f25e647a66cf79fd77f50ef4cf460.jpg"
                alt=""
              />
            </Link>
          </div>
          <div>
            <Link to="/">
              <img
                className="w-full"
                src="https://laptopaz.vn/media/banner/30_Jan706d314d1fb9aa646d546ecca9b36485.jpg"
                alt=""
              />
            </Link>
          </div>
          <div>
            <Link to="/">
              <img
                className="w-full"
                src="https://laptopaz.vn/media/banner/31_Jan8e7276c8ba31fc1ed7c1676ff701a365.png"
                alt=""
              />
            </Link>
          </div>
          <div>
            <Link to="/">
              <img
                className="w-full"
                src="https://laptopaz.vn/media/banner/01_Feb7803ca9beee4c232fe0ed7c9035f6f8d.jpg"
                alt=""
              />
            </Link>
          </div>
          <div>
            <Link to="/">
              <img
                className="w-full"
                src="https://laptopaz.vn/media/banner/03_Feb618b94a4eaf907a4f5fd7d2f36e6887b.jpg"
                alt=""
              />
            </Link>
          </div>
        </Slider>
        <div className="col-span-1 z-50">
          {/* <div>
                    <iframe width="100%" height={185} src="https://www.youtube.com/embed/lNbgB_PNYN8" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div> */}
          <div>
            <img
              src="https://laptopaz.vn/media/banner/14_Oct2abfc06f2548c018b6afe6bf064f3ab2.jpg"
              alt=""
              style={{ height: "185px", width: "100%" }}
            />
          </div>
          <div>
            <img
              src="https://laptopaz.vn/media/banner/13_Oct2d10cdfdfc80145ac11dc99f38a937ba.jpg"
              alt=""
              style={{ height: "185px", width: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
