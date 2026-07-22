import { axiosConfig } from "../helper/config";

export const getAllMasterObjekPajak = (page = 1, pageSize = 20, search = "") => {
  return axiosConfig("get", `/v1/masterTaxData/list-master-tax-data?page=${page}&limit=${pageSize}&search=${search}`);
};

export const getDetailMasterObjekPajak = (id) => {
  return axiosConfig("get", `/v1/masterTaxData/detail-master-tax-data/${id}`);
};

export const createMasterObjekPajak = (data) => {
  const payload = {
    tax_type: data.tax_type,
    taxable_item: data.taxable_item,
    rate: data.rate,
  };

  return axiosConfig("post", "/v1/masterTaxData/create-master-tax-data", {
    headers: { "Content-Type": "application/json" },
    data: payload,
  });
};

export const updateMasterObjekPajak = (id, data) => {
  const payload = {
    tax_type: data.tax_type,
    taxable_item: data.taxable_item,
    rate: data.rate,
  };

  return axiosConfig("put", `/v1/masterTaxData/update-master-tax-data/${id}`, {
    headers: { "Content-Type": "application/json" },
    data: payload,
  });
};

export const deleteMasterObjekPajak = (id) => {
  return axiosConfig("delete", `/v1/masterTaxData/delete-master-tax-data/${id}`);
};

export const seedMasterObjekPajak = () => {
  return axiosConfig("get", "/v1/masterTaxData/seed-master-tax-data");
};