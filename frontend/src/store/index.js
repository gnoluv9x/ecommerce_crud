import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import categorySlice from "../slice/categorySlice";
import productSlice from "../slice/productSlice";
import userSlice from "../slice/userSlice";
import orderSlice from "../slice/orderSlice";
import checkoutSlice from "../slice/checkoutSlice";
import dashboardSlice from "../slice/dashboardSlice";

const store = configureStore({
  reducer: {
    category: categorySlice,
    product: productSlice,
    user: userSlice,
    auth: authSlice,
    order: orderSlice,
    checkout: checkoutSlice,
    dashboard: dashboardSlice,
  },
});

export default store;
