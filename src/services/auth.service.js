import { axiosConfig } from "../helper/config";

export const apiLogin = (data) => {
  return axiosConfig("post", "/v1/auth/login", { headers: { "Content-Type": "application/json" }, data });
};

export const getMe = () => {
  return axiosConfig("get", "/v1/auth/me");
};
