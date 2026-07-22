import { axiosConfig } from "../helper/config";

export const getAllFakturPajak = (page = 1, pageSize = 20, search = "") => {
  return axiosConfig("get", `/v1/faktur-pajak/list-faktur-pajak?page=${page}&limit=${pageSize}&search=${search}`);
};

export const createFakturPajak = (data, files = []) => {
  let formData = new FormData();

  if (data.customer_id) formData.append("customer_id", data.customer_id);
  formData.append("nomor_invoice", data.nomor_invoice);
  formData.append("npwp", data.npwp);
  formData.append("no_faktur", data.no_faktur);
  formData.append("dpp", data.dpp);
  formData.append("tanggal_faktur", data.tanggal_faktur);
  formData.append("status", data.status);

  const fileArray = Array.isArray(files) ? files : Array.from(files || []);
  fileArray.forEach((file) => {
    formData.append("file_faktur_pajak", file);
  });

  return axiosConfig("post", "/v1/faktur-pajak/create-faktur-pajak", {
    headers: { "Content-Type": "multipart/form-data" },
    data: formData,
  });
};

export const updateFakturPajak = (id, data, files = []) => {
  const formData = new FormData();

  if (data.customer_id) formData.append("customer_id", data.customer_id);
  if (data.nomor_invoice) formData.append("nomor_invoice", data.nomor_invoice);
  if (data.npwp) formData.append("npwp", data.npwp);
  if (data.no_faktur) formData.append("no_faktur", data.no_faktur);
  if (data.tanggal_faktur) formData.append("tanggal_faktur", data.tanggal_faktur);
  if (data.status) formData.append("status", data.status);

  const fileArray = Array.isArray(files) ? files : Array.from(files || []);
  fileArray.forEach((file) => {
    formData.append("file_faktur_pajak", file);
  });

  return axiosConfig("PUT", `/v1/faktur-pajak/update-faktur-pajak/${id}`, {
    headers: { "Content-Type": "multipart/form-data" },
    data: formData,
  });
};

export const deleteFakturPajak = (id) => {
  return axiosConfig("delete", `/v1/faktur-pajak/delete-faktur-pajak/${id}`);
};

export const getDetailFakturPajak = (id) => {
  return axiosConfig("get", `/v1/faktur-pajak/detail-faktur-pajak/${id}`);
};

export const exportFakturPajak = () => {
  return axiosConfig("get", "/v1/faktur-pajak/excel-faktur-pajak", {
    responseType: "blob",
  });
};