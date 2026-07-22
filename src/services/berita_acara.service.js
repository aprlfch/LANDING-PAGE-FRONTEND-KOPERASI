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
// tipeSumber: "internal" | "eksternal"
// - internal  -> pembayaran, periodeMulai, periodeSelesai wajib diisi
// - eksternal -> minimal 1 file dokumen wajib diupload
export const createBeritaAcara = (data, files = []) => {
  const formData = new FormData();

  safeAppend(formData, "penjualanBarangJasaId", data.penjualanBarangJasaId);
  safeAppend(formData, "tipeSumber", data.tipeSumber); // "internal" | "eksternal"
  safeAppend(formData, "nomorBapk", data.nomorBapk); // opsional, auto-generate kalau kosong
  safeAppend(formData, "tempatPenerbitan", data.tempatPenerbitan);
  safeAppend(formData, "tanggalPenerbitan", data.tanggalPenerbitan);
  safeAppend(formData, "judul", data.judul);
  safeAppend(formData, "namaPihakPertama", data.namaPihakPertama);
  safeAppend(formData, "jabatanPihakPertama", data.jabatanPihakPertama);
  safeAppend(formData, "keteranganPihakPertama", data.keteranganPihakPertama);
  safeAppend(formData, "namaPihakKedua", data.namaPihakKedua);
  safeAppend(formData, "jabatanPihakKedua", data.jabatanPihakKedua);
  safeAppend(formData, "keteranganPihakKedua", data.keteranganPihakKedua);
  safeAppend(formData, "pembayaran", data.pembayaran);
  safeAppend(formData, "periodeMulai", data.periodeMulai);
  safeAppend(formData, "periodeSelesai", data.periodeSelesai);
  safeAppend(formData, "keterangan", data.keterangan);

  // upload dokumen (PDF/JPG/JPEG) - wajib kalau tipeSumber "eksternal"
  files.forEach((file) => {
    formData.append("dokumenPath", file);
  });

  return axiosConfig(
    "post",
    "/v1/beritaAcara/create-berita-acara",
    {
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    }
  );
};

// ─── LIST ────────────────────────────────────────────────────────────────
export const getBeritaAcaraList = ({
  page = 1,
  limit = 20,
  search = "",
  tipeSumber = "", // "" | "internal" | "eksternal"
} = {}) => {
  return axiosConfig(
    "get",
    "/v1/beritaAcara/list-berita-acara",
    {
      params: { page, limit, search, tipeSumber },
    }
  );
};

// ─── DETAIL ──────────────────────────────────────────────────────────────
export const getBeritaAcaraById = (id) => {
  return axiosConfig(
    "get",
    `/v1/beritaAcara/berita-acara/${id}`
  );
};

// ─── DETAIL BY PENJUALAN ───────────────────────────────────────────────
// Dipakai untuk cek apakah suatu penjualan sudah punya BA
// (misal untuk menampilkan/menyembunyikan tombol "Buat BA").
export const getBeritaAcaraByPenjualanId = (penjualanBarangJasaId) => {
  return axiosConfig(
    "get",
    `/v1/beritaAcara/berita-acara-by-penjualan/${penjualanBarangJasaId}`
  );
};

// ─── DELETE ──────────────────────────────────────────────────────────────
export const deleteBeritaAcara = (id) => {
  return axiosConfig(
    "delete",
    `/v1/beritaAcara/delete-berita-acara/${id}`
  );
};