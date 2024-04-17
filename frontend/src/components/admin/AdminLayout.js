import React from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();
  const logout = () => {
    if (localStorage.getItem("user")) {
      navigate("/signin");
      return localStorage.removeItem("user");
    }
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
      <div className="grid grid-cols-12">
        <nav className="col-span-2 bg-blue-600">
          <ul className="nav flex-column mt-[20px]">
            <li className="nav-item py-2">
              <NavLink
                className="nav-link text-md text-white font-semibold hover:bg-[#1E90FF] rounded-md"
                aria-current="page"
                to="/admin"
              >
                <span style={{ padding: "0 4px 0 2px" }}>
                  <i className="fas fa-home" />
                </span>{" "}
                Trang Chủ
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
                Quản Trị Danh Mục
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
                Quản Trị Sản Phẩm
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
                Quản Trị Đơn Hàng
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
                Quản Trị Người Dùng
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="col-span-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
