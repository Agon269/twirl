import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
let user = cookies.get("user");

// let localApi = "http://localhost:5000/api";
let deplApi = "https://frozen-taiga-24724.herokuapp.com/api";
export default axios.create({
  baseURL: deplApi,
  params: {},
  headers: {
    user,
    "Content-Type": "application/json",
  },
});
