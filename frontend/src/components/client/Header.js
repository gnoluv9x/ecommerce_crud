import Cookie from "js-cookie";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Link, useNavigate } from "react-router-dom";
import { getUserInfos } from "../../utils/util";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const handleSearch = e => {
    e.preventDefault();
    navigate(`/search?name=${searchText}`);
  };
  const [cartNumber, setCartNumber] = useState(localStorage.getItem("cartNumber"));
  const { user } = getUserInfos();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("cartNumber");
    localStorage.removeItem("totalPrice");

    Cookie.remove("refreshToken");
    Cookie.remove("accessToken");

    dispatchEvent(new Event("storage"));

    navigate("/signin");
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setCartNumber(localStorage.getItem("cartNumber"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div>
      <div className="header">
        <div className=" container mx-auto flex py-1 justify-between items-center max-w-[1200px]">
          <div>
            <Link to="/">
              <img
                className="h-24 w-40"
                src="https://laptopaz.vn/media/banner/logo_laptopaz%20(2).jpg"
                alt=""
              />
            </Link>
          </div>
          <div>
            <form onSubmit={handleSearch}>
              <input
                className="search-input py-2 px-3 border border-blue-500 text-sm outline-none w-[370px]"
                onChange={e => {
                  setSearchText(e.target.value);
                }}
                type="text"
                placeholder="What product do you want to find?"
              />
              <input
                className="-ml-2 bg-blue-500 border border-blue-500 text-white text-sm px-2 py-2 cursor-pointer"
                id="btn_search"
                type="submit"
                defaultValue="Search"
              />
            </form>
          </div>
          <div className="text-center text-black text-base font-semibold">
            <p className="text-red-600 text-sm">
              <span>
                <i className="fas fa-phone-alt" />
              </span>{" "}
              HOTLINE
            </p>
            <p className="text-sm ">09865.02468 - 08586.02468</p>
            <p className="text-sm">Address: No. 18, Lane 121, Thai Ha, Dong Da, Hanoi</p>
            <div className="flex justify-center">
              <Link
                to="/about"
                className="bg-blue-500 hover:bg-blue-700 rounded-md text-white mt-1 w-[150px]"
              >
                Introduce
              </Link>
              <Link
                to="/contact"
                className="bg-blue-500 hover:bg-blue-700 rounded-md text-white mt-1 w-[150px] ml-3"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="items-center">
            <div className="flex">
              <div className="text-center">
                <Link to="/cart">
                  <span className="text-red-600 text-lg cursor-pointer">
                    <i className="fas fa-cart-plus" />
                  </span>
                  <p id="cart" className="text-sm font-medium cursor-pointer">
                    Cart
                  </p>
                  <span
                    className="absolute rounded-full px-1.5 bg-red-600 text-sm text-white ml-1 top-5"
                    id="totalCart"
                  >
                    {cartNumber}
                  </span>
                </Link>
              </div>
              {user ? (
                user.permission === 0 ? (
                  <div className="ml-3 group cursor-pointer z-[60]">
                    <div class="user-infos flex flex-col items-center">
                      <span className="text-red-600 text-lg ml-7">
                        <i className="fas fa-user" />
                      </span>
                      <p className="text-sm font-medium ml-2 relative">
                        Hi <span className="text-blue-600">{user.name}</span>
                      </p>
                    </div>
                    <div className="hidden group-hover:block absolute z-50 bg-white rounded-md border border-blue-600 top-[75px] min-w-[150px]">
                      <Link to="/admin">
                        <button className="hover:bg-gray-200 rounded-t-md py-3 text-sm font-semibold text-black hover:text-gray-700 w-100">
                          Administration
                        </button>
                      </Link>
                      <br />
                      <Link to="/order">
                        <button className="hover:bg-gray-200 border-b border-t rounded-t-md py-3 text-sm font-semibold text-black hover:text-gray-700 w-100">
                          Orders
                        </button>
                      </Link>
                      <br />
                      <button
                        onClick={logout}
                        className="cursor-pointer hover:bg-gray-200 rounded-b-md px-10 text-sm py-3 font-semibold text-black hover:text-gray-700 w-100"
                        id="logout"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="ml-3 group cursor-pointer z-[60]">
                    <span className="text-red-600 text-lg" style={{ marginLeft: "30px" }}>
                      <i className="fas fa-user" />
                    </span>
                    <p className="text-sm font-medium ml-2 relative">
                      Hi <span className="text-blue-600">{user.name}</span>
                    </p>
                    <div
                      className="hidden group-hover:block absolute z-50 bg-white rounded-md border border-blue-600"
                      style={{ top: "75px" }}
                    >
                      <Link to="/order">
                        <button
                          className="hover:bg-gray-200 border-b border-t rounded-t-md py-3 text-sm font-semibold text-black hover:text-gray-700"
                          style={{ padding: "0 50.2px" }}
                        >
                          Orders
                        </button>
                      </Link>
                      <br />
                      <button
                        onClick={logout}
                        className="cursor-pointer hover:bg-gray-200 rounded-b-md px-10 text-sm py-3 font-semibold text-black hover:text-gray-700"
                        style={{ padding: "0 49px" }}
                        id="logout"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )
              ) : (
                <div className="ml-12">
                  <Link className="ml-2" to="/signin">
                    <span className="text-red-600 text-lg">
                      <i className="fas fa-user" />
                    </span>
                    <p id="login" className="text-sm font-medium">
                      Login
                    </p>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-blue-500">
        <div className="mx-auto" style={{ width: "1200px" }}>
          <Marquee speed={30}>
            <p className="text-white font-semibold py-1">
              <span>Address: No. 18, Lane 121, Thai Ha, Dong Da, Hanoi.</span>
              <span className="ml-8">Hotline: 09865.02468 - 08586.02468.</span>
              <span className="ml-8">Email: hotrolaptopaz@gmail.com.</span>
              <span className="ml-8">Technical support: 0989.52.4004</span>
            </p>
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default Header;
