import { message } from "antd";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const handleLogout = (navigate) => {
  cookies.remove("access_token", { path: "/" });
  cookies.remove("getMe", { path: "/" });
  navigate("/", { replace: true });
  window.location.reload();
};

export const handleAPIError = (error, navigate) => {
  console.log(error);
  if (error.response) {
    if (error.response.status === 401) {
      handleLogout(navigate);
      message.error("Your session has expired, please re-login");
    } else {
      toast.error(error?.response?.data?.message || error?.response?.statusText || "Failed! Unknown Error", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } else if (typeof error.message === "string") {
    message.error(error.message);
  } else {
    message.error("Failed! Unknown Error");
  }
};

export const handleApiSuccess = (res) => {
  if (res.data?.data) {
    toast.success(res.data.data, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } else {
    toast.success("Aksi yang anda lakukan berhasil", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  setTimeout(() => {
    window.location.reload();
  }, 1000);
};

export const debounce = (func, delay) => {
  let debounceTimeout;
  return (...args) => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => func(...args), delay);
  };
};