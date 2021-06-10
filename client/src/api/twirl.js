import axios from "axios";
import Cookies from "js-cookie";
let cookie = Cookies.get("jwt");
export default axios.create({
  baseURL: "http://localhost:5000/api",
  params: {},
  withCredentials: true,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    user: cookie,
  },
});
