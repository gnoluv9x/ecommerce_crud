import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://db-laptop.herokuapp.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});
