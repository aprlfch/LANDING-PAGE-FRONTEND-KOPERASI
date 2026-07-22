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
export const createPenjualanBarangJasa = (data, files = []) => {
  const formData = new FormData();

  safeAppend(formData, "tanggalPermintaan", data.tanggalPermintaan);
  safeAppend(formData, "lokasi", data.lokasi);
  safeAppend(formData, "unitDepartemen", data.unitDepartemen);
  safeAppend(formData, "picUser", data.picUser);
  safeAppend(formData, "statusPekerjaan", data.statusPekerjaan);
  safeAppend(formData, "estimasiBiaya", data.estimasiBiaya);
  safeAppend(formData, "biayaTotal", data.biayaTotal);
  safeAppend(formData, "costCenter", data.costCenter);
  safeAppend(formData, "sumberAnggaran", data.sumberAnggaran);
  safeAppend(formData, "noSpkPoSo", data.noSpkPoSo); // <- ini yang nentuin statusClosing di backend, jangan kirim statusClosing manual
  safeAppend(formData, "tanggalMulai", data.tanggalMulai);
  safeAppend(formData, "targetSelesai", data.targetSelesai);
  safeAppend(formData, "durasiPelaksanaan", data.durasiPelaksanaan);
  safeAppend(formData, "keterangan", data.keterangan);
  safeAppend(formData, "vendorId", data.vendorId);

  // array detail (barang/jasa)
  formData.append("details", JSON.stringify(data.details || []));

  // progress opsional saat create awal (kalau mau langsung isi progress pertama)
  if (data.progress && data.progress.length > 0) {
    formData.append("progress", JSON.stringify(data.progress));
  }

  // upload file
  files.forEach((file) => {
    formData.append("dokumenPath", file);
  });

  return axiosConfig(
    "post",
    "/v1/penjualan/create-penjualan-barang-jasa",
    {
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    }
  );
};

// ─── LIST ────────────────────────────────────────────────────────────────
export const getPenjualanBarangJasaList = ({
  page = 1,
  limit = 20,
  search = "",
  statusClosing = "", // "" | "Open" | "Done"
} = {}) => {
  return axiosConfig(
    "get",
    "/v1/penjualan/list-penjualan-barang-jasa",
    {
      params: { page, limit, search, statusClosing },
    }
  );
};

// ─── DETAIL ──────────────────────────────────────────────────────────────
export const getPenjualanBarangJasaById = (id) => {
  return axiosConfig(
    "get",
    `/v1/penjualan/penjualan-barang-jasa/${id}`
  );
};

// ─── UPDATE ──────────────────────────────────────────────────────────────
export const updatePenjualanBarangJasa = (id, data, files = []) => {
  const formData = new FormData();

  safeAppend(formData, "tanggalPermintaan", data.tanggalPermintaan);
  safeAppend(formData, "lokasi", data.lokasi);
  safeAppend(formData, "unitDepartemen", data.unitDepartemen);
  safeAppend(formData, "picUser", data.picUser);
  safeAppend(formData, "statusPekerjaan", data.statusPekerjaan);
  safeAppend(formData, "estimasiBiaya", data.estimasiBiaya);
  safeAppend(formData, "biayaTotal", data.biayaTotal);
  safeAppend(formData, "costCenter", data.costCenter);
  safeAppend(formData, "sumberAnggaran", data.sumberAnggaran);
  safeAppend(formData, "noSpkPoSo", data.noSpkPoSo);
  safeAppend(formData, "tanggalMulai", data.tanggalMulai);
  safeAppend(formData, "targetSelesai", data.targetSelesai);
  safeAppend(formData, "durasiPelaksanaan", data.durasiPelaksanaan);
  safeAppend(formData, "keterangan", data.keterangan);
  safeAppend(formData, "vendorId", data.vendorId);
  formData.append("details", JSON.stringify(data.details || []));

  files.forEach((file) => {
    formData.append("dokumenPath", file);
  });

  return axiosConfig(
    "put",
    `/v1/penjualan/update-penjualan-barang-jasa/${id}`,
    {
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    }
  );
};

// ─── DELETE ──────────────────────────────────────────────────────────────
export const deletePenjualanBarangJasa = (id) => {
  return axiosConfig(
    "delete",
    `/v1/penjualan/delete-penjualan-barang-jasa/${id}`
  );
};

// ─── PROGRESS ────────────────────────────────────────────────────────────
export const addProgressPenjualanBarangJasa = (id, { tanggalProgress, keterangan }) => {
  return axiosConfig(
    "post",
    `/v1/penjualan/create-progress-penjualan-barang-jasa/${id}`,
    {
      data: { tanggalProgress, keterangan },
    }
  );
};

export const deleteProgressPenjualanBarangJasa = (id, progressId) => {
  return axiosConfig(
    "delete",
    `/v1/penjualan/delete-progress-penjualan-barang-jasa/${id}/${progressId}`
  );
};

// ─── EXPORT EXCEL ────────────────────────────────────────────────────────
export const downloadExcelPenjualanBarangJasa = () => {
  return axiosConfig(
    "get",
    "/v1/penjualan/penjualan-excel",
    {
      responseType: "blob",
    }
  );
};