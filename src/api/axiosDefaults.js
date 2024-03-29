import axios from "axios";

axios.defaults.baseURL =
  "https://brick-connect-api-e6b45c41a17a.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

// Create the axiosReq (request) and axiosRes (response) interceptors
export const axiosReq = axios.create();
export const axiosRes = axios.create();
