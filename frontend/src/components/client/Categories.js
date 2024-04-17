import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Categories = () => {
  const categories = useSelector(state => {
    return state.category.data;
  });

  return (
    <aside className="col-span-1 bg-gray-100">
      <div className=" shadow-lg">
        <h2 className="bg-blue-500 text-white text-base uppercase py-3 px-3 rounded-t-md text-center">
          <span>
            <i className="fas fa-bars" />
          </span>
          <span className="pl-4 font-semibold">Danh mục</span>
        </h2>
        <ul>
          <li>
            {categories &&
              categories.map(item => {
                return (
                  <Link
                    to={`/categories/${item._id}`}
                    key={item._id}
                    className="block pl-[70px] py-[12px] text-sm font-semibold border-b border-l border-r border-gray-300 hover:bg-blue-300 hover:text-white"
                  >
                    {item.name}
                  </Link>
                );
              })}
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Categories;
