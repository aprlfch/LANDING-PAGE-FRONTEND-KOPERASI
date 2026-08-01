import { axiosConfig } from "../helper/config";


// ─── CREATE ──────────────────────────────────────────────────────────────
// Membuat kategori baru
// body:
// {
//    name: "Teknologi"
// }
export const createCategory = (data) => {

  return axiosConfig(
    "post",
    "/v1/category/create-category",
    {
      data
    }
  );

};



// ─── LIST ────────────────────────────────────────────────────────────────
// Mengambil semua kategori
// Dipakai untuk:
// - dropdown kategori berita
// - management kategori
//
// params:
// page
// limit
// search
export const getCategoryList = ({
  page = 1,
  limit = 50,
  search = "",
} = {}) => {

  return axiosConfig(
    "get",
    "/v1/category/list-category",
    {
      params: {
        page,
        limit,
        search
      }
    }
  );

};



// ─── DETAIL BY ID ────────────────────────────────────────────────────────
// Mengambil detail kategori berdasarkan id
export const getCategoryById = (id) => {

  return axiosConfig(
    "get",
    `/v1/category/category/${id}`
  );

};



// ─── UPDATE ──────────────────────────────────────────────────────────────
// Update kategori
//
// body:
// {
//    name:"Kategori Baru"
// }
export const updateCategory = (id, data) => {

  return axiosConfig(
    "put",
    `/v1/category/update-category/${id}`,
    {
      data
    }
  );

};



// ─── DELETE ──────────────────────────────────────────────────────────────
// Hapus kategori
export const deleteCategory = (id) => {

  return axiosConfig(
    "delete",
    `/v1/category/delete-category/${id}`
  );

};