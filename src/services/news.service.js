import { axiosConfig } from "../helper/config";

// Helper: FormData.append() mengubah null/undefined jadi string literal "null"/"undefined".
// Fungsi ini memastikan nilai kosong/null/undefined selalu dikirim sebagai string kosong "",
// supaya backend bisa membedakan "field memang kosong" vs "field terisi string 'null'".
const safeAppend = (formData, key, value) => {
  if (value === null || value === undefined) {
    formData.append(key, "");
  } else {
    formData.append(key, value);
  }
};

// ─── CREATE ──────────────────────────────────────────────────────────────
// status: "draft" | "published" | "archived"
// thumbnail: single file (image) - opsional
// tagIds: array of number, misal [1, 2, 3] - opsional
export const createNews = (data, thumbnail = null) => {
  const formData = new FormData();

  safeAppend(formData, "title", data.title);
  safeAppend(formData, "categoryId", data.categoryId);
  safeAppend(formData, "excerpt", data.excerpt);
  safeAppend(formData, "content", data.content);
  safeAppend(formData, "status", data.status || "draft");
  safeAppend(formData, "isFeatured", data.isFeatured ?? false);
  safeAppend(formData, "publishedAt", data.publishedAt);

  // tagIds dikirim sebagai JSON string, backend akan parse ulang
  if (data.tagIds && data.tagIds.length > 0) {
    formData.append("tagIds", JSON.stringify(data.tagIds));
  }

  // thumbnail (JPG/JPEG/PNG/WEBP) - opsional
  if (thumbnail) {
    formData.append("thumbnail", thumbnail);
  }

  return axiosConfig(
    "post",
    "/v1/news/create-news",
    {
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    }
  );
};

// ─── UPDATE ──────────────────────────────────────────────────────────────
export const updateNews = (id, data, thumbnail = null) => {
  const formData = new FormData();

  safeAppend(formData, "title", data.title);
  safeAppend(formData, "categoryId", data.categoryId);
  safeAppend(formData, "excerpt", data.excerpt);
  safeAppend(formData, "content", data.content);
  safeAppend(formData, "status", data.status);
  safeAppend(formData, "isFeatured", data.isFeatured);
  safeAppend(formData, "publishedAt", data.publishedAt);

  if (data.tagIds !== undefined) {
    formData.append("tagIds", JSON.stringify(data.tagIds));
  }

  if (thumbnail) {
    formData.append("thumbnail", thumbnail);
  }

  return axiosConfig(
    "put",
    `/v1/news/update-news/${id}`,
    {
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    }
  );
};

// ─── LIST ────────────────────────────────────────────────────────────────
export const getNewsList = ({
  page = 1,
  limit = 20,
  search = "",
  categoryId = "",
  status = "", // "" | "draft" | "published" | "archived"
} = {}) => {
  return axiosConfig(
    "get",
    "/v1/news/list-news",
    {
      params: { page, limit, search, categoryId, status },
    }
  );
};

// ─── DETAIL BY ID ────────────────────────────────────────────────────────
// Dipakai untuk keperluan admin (edit form, dsb).
export const getNewsById = (id) => {
  return axiosConfig(
    "get",
    `/v1/news/news/${id}`
  );
};

// ─── DETAIL BY SLUG ──────────────────────────────────────────────────────
// Dipakai untuk halaman publik/landing page (otomatis nambah views).
export const getNewsBySlug = (slug) => {
  return axiosConfig(
    "get",
    `/v1/news/news-by-slug/${slug}`
  );
};

// ─── DELETE ──────────────────────────────────────────────────────────────
export const deleteNews = (id) => {
  return axiosConfig(
    "delete",
    `/v1/news/delete-news/${id}`
  );
};