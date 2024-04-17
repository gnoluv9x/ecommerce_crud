import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import categorySlice from "../slice/categorySlice";
import productSlice from "../slice/productSlice";
import userSlice from "../slice/userSlice";
import orderSlice from "../slice/orderSlice";

const store = configureStore({
  reducer: {
    category: categorySlice,
    product: productSlice,
    user: userSlice,
    auth: authSlice,
    order: orderSlice,
  },
});

export default store;
