import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_KEY,
  timeout: 99999,
});