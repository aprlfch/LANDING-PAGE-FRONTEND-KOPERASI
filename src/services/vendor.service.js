import { axiosConfig } from "../helper/config";

export const getAllVendor = (page = 1, pageSize = 20, search = "") => {
  return axiosConfig("get", `/v1/vendor/list-vendor?page=${page}&limit=${pageSize}&search=${search}`);
};

export const createVendor = (data) => {
  return axiosConfig("post", "/v1/vendor/vendor", {
    headers: { "Content-Type": "application/json" },
    data: {
      npwp: data.npwp,
      vendor_name: data.vendor_name,
      alamat: data.alamat,
      no_hp: data.no_hp,
    },
  });
};

export const updateVendor = (id, data) => {
  return axiosConfig("put", `/v1/vendor/vendor/${id}`, {
    headers: { "Content-Type": "application/json" },
    data: {
      ...(data.npwp && { npwp: data.npwp }),
      ...(data.vendor_name && { vendor_name: data.vendor_name }),
      ...(data.alamat && { alamat: data.alamat }),
      ...(data.no_hp && { no_hp: data.no_hp }),
    },
  });
};

export const deleteVendor = (id) => {
  return axiosConfig("delete", `/v1/vendor/delete-vendor/${id}`);
};

export const getDetailVendor = (id) => {
  return axiosConfig("get", `/v1/vendor/vendor/${id}`);
};