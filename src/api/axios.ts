import axios from "axios";

const token = localStorage.getItem("ut") ?? "";

export default axios.create({
  baseURL: "http://localhost",
  headers: {
    "Content-Type": "Application/json",
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});
