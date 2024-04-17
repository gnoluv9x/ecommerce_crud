import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

export const prices = x => {
  return (x = x.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  }));
};

export const ErrorMessage = error => toast.error(error);
export const SuccessMessage = success => toast.success(success);
export const WarningMessage = warning => toast.warning(warning);

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return false;
  }
};
export const authenticated = accessToken => {
  const user = jwt_decode(accessToken);
  if (typeof window !== "undefined") {
    return localStorage.setItem("user", JSON.stringify(user));
  }
};

export const arraySort = (arr, index) => {
  let newArr = [...arr];
  let element = arr[index];
  newArr.splice(index, 1);
  newArr.splice(0, 0, element);
  return newArr;
};

export const addToCart = (id, name, image, price) => {
  let cartStorage = localStorage.getItem("cart");
  let screenCart = null;
  if (cartStorage == null) {
    screenCart = [];
  } else {
    screenCart = JSON.parse(cartStorage);
    console.log(screenCart);
  }

  let item = {
    id: id,
    name: name,
    image: image,
    price: price,
  };

  let existed = screenCart.findIndex(ele => ele.id === item.id);
  if (existed === -1) {
    item.quantity = 1;
    screenCart.push(item);
  } else {
    console.log(screenCart);
    screenCart[existed].quantity++;
  }
  console.log(item);
  localStorage.setItem("cart", JSON.stringify(screenCart));
};

export const getTotalItemOnCart = () => {
  let cartStorage = localStorage.getItem("cart");
  let screenCart = null;
  if (cartStorage == null) {
    screenCart = [];
  } else {
    screenCart = JSON.parse(cartStorage);
  }
  let totalItems = 0;
  screenCart.forEach(element => {
    totalItems += element.quantity;
  });
  localStorage.setItem("cartNumber", totalItems);
  return totalItems;
};

export function getCurrentDate(separator = "-") {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${date}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year}`;
}
