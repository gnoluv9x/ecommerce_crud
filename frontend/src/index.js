import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store/index";
import "./index.css";
import "./tailwind.css";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>,
  document.getElementById("root")
);
