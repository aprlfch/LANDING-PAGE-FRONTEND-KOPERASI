import { axiosConfig } from "../helper/config";

export const getAllUser = () => {
  return axiosConfig("get", "/v1/auth/list-user");
};

export const createUser = (data) => {
  let formData = new FormData();
  const { fullname, email, password, role } = data;

  // Menambahkan data ke FormData
  formData.append("fullname", fullname);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("role", role);

  // Mengirim permintaan POST
  return axiosConfig("post", "/v1/auth/register", {
    headers: { "Content-Type": "multipart/form-data" },
    data: formData,
  });
};

export const udpateUser = (id, data) => {
  let formData = new FormData();
  const { fullname, email, nip, password, role_id, cost_center_id, signature } = data;

  fullname && formData.append("fullname", fullname);
  email && formData.append("email", email);
  nip && formData.append("nip", nip);
  password && formData.append("password", password);
  role_id && formData.append("role_id", role_id);
  cost_center_id && formData.append("cost_center_id", cost_center_id);
  signature && formData.append("signature", signature);

  return axiosConfig("post", `/v1/api/master/user-management/update/${id}`, { headers: { "Content-Type": "multipart/form-data" }, data: formData });
};

export const deleteUser = (id) => {
  return axiosConfig("delete", `/v1/api/master/user-management/delete/${id}`);
};
