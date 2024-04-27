import React from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import Cookie from "js-cookie";

const AdminLayout = () => {
  const navigate = useNavigate();

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
  return (
    <div>
      <header className="navbar navbar-dark sticky-top bg-primary flex-md-nowrap p-0 shadow">
        <NavLink className="navbar-brand col-md-3 col-lg-2 me-0 px-3 py-3 ml-24 text-white" to="/">
          BACK TO WEBSITE
        </NavLink>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <span className="nav-link px-3 cursor-pointer" onClick={logout}>
              Sign out
            </span>
          </div>
        </div>
      </header>
      <div className="min-h-[calc(100vh-62px)] flex">
        <nav className="bg-blue-600 w-64 fixed top-[62px] bottom-0 left-0">
          <ul className="nav flex-column mt-[20px]">
            <li className="nav-item py-2">
              <NavLink
                className="nav-link text-md text-white font-semibold hover:bg-[#1E90FF] rounded-md"
                aria-current="page"
                to="dashboard"
              >
                <span style={{ padding: "0 4px 0 2px" }}>
                  <i className="fas fa-chart-line"></i>
                </span>{" "}
                Report
              </NavLink>
            </li>
            <li className="nav-item py-2">
              <NavLink
                className="nav-link text-md text-white font-semibold hover:bg-[#1E90FF] rounded-md"
                to="categories"
              >
                <span style={{ padding: "0 6px 0 4px" }}>
                  {" "}
                  <i className="fas fa-calendar-week" />
                </span>{" "}
                Category Management
              </NavLink>
            </li>
            <li className="nav-item py-2">
              <NavLink
                className="nav-link text-md text-white font-semibold hover:bg-[#1E90FF] rounded-md"
                to="products"
              >
                <span style={{ padding: "0 6px 0 2px" }}>
                  <i className="fas fa-music" />
                </span>{" "}
                Product Management
              </NavLink>
            </li>
            <li className="nav-item py-2">
              <NavLink
                className="nav-link text-md text-white font-semibold hover:bg-[#1E90FF] rounded-md"
                to="orders"
              >
                <span style={{ padding: "0 6px 0 2px" }}>
                  <i className="fas fa-clipboard-list pl-[2px]"></i>
                </span>{" "}
                Order Management
              </NavLink>
            </li>
            <li className="nav-item py-2">
              <NavLink
                className="nav-link text-md text-white font-semibold hover:bg-[#1E90FF] rounded-md"
                to="users"
              >
                <span style={{ padding: "0 6px 0 2px" }}>
                  <i className="fas fa-user"></i>
                </span>{" "}
                User Administration
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="pl-64 flex-grow-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
