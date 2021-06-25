import axios from "axios";
import Cookies from "js-cookie";
let cookie = Cookies.get("user");
let localApi = "http://localhost:5000/api";
let deplApi = "https://frozen-taiga-24724.herokuapp.com/api";
export default axios.create({
  baseURL: deplApi,
  params: {},
  withCredentials: true,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    user: cookie,
  },
});
