import { toast } from "react-toastify";
import Cookies from "js-cookie";

export const prices = x => {
  return (x = x.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  }));
};

export const ErrorMessage = (error, duration = 1000) => toast.error(error, { autoClose: duration });
export const SuccessMessage = (success, duration = 1000) =>
  toast.success(success, { autoClose: duration });
export const WarningMessage = (warning, duration = 1000) =>
  toast.warning(warning, { autoClose: duration });

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }

  const user = Cookies.get("accessToken");

  return !!user;
};

export const getUserInfos = () => {
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return false;
  }
};

export const arraySort = (arr, index) => {
  let newArr = [...arr];
  let element = arr[index];
  newArr.splice(index, 1);
  newArr.splice(0, 0, element);
  return newArr;
};

export const addToCart = (id, name, image, price, quantity) => {
  let cartStorage = localStorage.getItem("cart");
  let screenCart = null;

  if (!cartStorage) {
    screenCart = [];
  } else {
    screenCart = [...JSON.parse(cartStorage)];
  }

  let item = {
    id: id,
    name: name,
    image: image,
    price: price,
    stock: quantity,
  };

  let existed = screenCart.findIndex(ele => ele.id === item.id);

  if (existed === -1) {
    item.quantity = 1;
    screenCart.push(item);
  } else {
    screenCart[existed].quantity += 1;
  }

  let totalPrice = 0;
  let cartNumber = 0;

  screenCart.forEach(cartItem => {
    totalPrice += cartItem.quantity * cartItem.price;
    cartNumber += cartItem.quantity;
  });

  localStorage.setItem("cart", JSON.stringify(screenCart));
  localStorage.setItem("cartNumber", cartNumber);
  localStorage.setItem("totalPrice", totalPrice);
  dispatchEvent(new Event("storage"));
};

export function getCurrentDate(separator = "-") {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${date}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year}`;
}
