import axios from "axios";


axios.defaults.baseURL = 'https://brick-connect-api-e6b45c41a17a.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true

export const axiosReq = axios.create();
export const axiosRes = axios.create();