import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const axiosConfig = (method, url, options = {}) => {
  const token = cookies.get("access_token");
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}${url}`;

  const headers = options.headers || {};
  const data = options.data !== undefined ? options.data : null;

  Object.keys(headers).forEach((key) => headers[key] == null && delete headers[key]);

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    method,
    url: apiUrl,
    headers: headers,
    data,
  };

  if (options.responseType) {
    config.responseType = options.responseType;
  }

  return axios.request(config);
};
