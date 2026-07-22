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
export const createPembelianBarangJasa = (data, files = []) => {
  const formData = new FormData();

  safeAppend(formData, "tanggalPermintaan", data.tanggalPermintaan);
  safeAppend(formData, "lokasi", data.lokasi);
  safeAppend(formData, "unitDepartemen", data.unitDepartemen);
  safeAppend(formData, "picUser", data.picUser);
  safeAppend(formData, "statusPekerjaan", data.statusPekerjaan);
  safeAppend(formData, "nilai", data.nilai);
  safeAppend(formData, "costCenter", data.costCenter);
  safeAppend(formData, "sumberAnggaran", data.sumberAnggaran);
  safeAppend(formData, "keterangan", data.keterangan);

  // array detail (barang/jasa)
  formData.append("details", JSON.stringify(data.details || []));

  // upload dokumen pendukung
  files.forEach((file) => {
    formData.append("dokumenPath", file);
  });

  return axiosConfig(
    "post",
    "/v1/pembelian/create-pembelian-barang-jasa",
    {
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    }
  );
};

// ─── LIST ────────────────────────────────────────────────────────────────
export const getPembelianBarangJasaList = ({
  page = 1,
  limit = 20,
  search = "",
  statusClosing = "", // "" | "Open" | "Done"
} = {}) => {
  return axiosConfig(
    "get",
    "/v1/pembelian/list-pembelian-barang-jasa",
    {
      params: { page, limit, search, statusClosing },
    }
  );
};

// ─── DETAIL ──────────────────────────────────────────────────────────────
export const getPembelianBarangJasaById = (id) => {
  return axiosConfig(
    "get",
    `/v1/pembelian/pembelian-barang-jasa/${id}`
  );
};

// ─── UPDATE ──────────────────────────────────────────────────────────────
// Catatan: noSpkPoSo TIDAK dikirim manual dari sini — SPK/PO/SO diisi
// otomatis lewat proses "Pilih Vendor Pemenang" (lihat pilihVendorPemenangPembelian).
export const updatePembelianBarangJasa = (id, data, files = []) => {
  const formData = new FormData();

  safeAppend(formData, "tanggalPermintaan", data.tanggalPermintaan);
  safeAppend(formData, "lokasi", data.lokasi);
  safeAppend(formData, "unitDepartemen", data.unitDepartemen);
  safeAppend(formData, "picUser", data.picUser);
  safeAppend(formData, "statusPekerjaan", data.statusPekerjaan);
  safeAppend(formData, "nilai", data.nilai);
  safeAppend(formData, "costCenter", data.costCenter);
  safeAppend(formData, "sumberAnggaran", data.sumberAnggaran);
  safeAppend(formData, "keterangan", data.keterangan);
  formData.append("details", JSON.stringify(data.details || []));

  files.forEach((file) => {
    formData.append("dokumenPath", file);
  });

  return axiosConfig(
    "put",
    `/v1/pembelian/update-pembelian-barang-jasa/${id}`,
    {
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    }
  );
};

// ─── DELETE ──────────────────────────────────────────────────────────────
export const deletePembelianBarangJasa = (id) => {
  return axiosConfig(
    "delete",
    `/v1/pembelian/delete-pembelian-barang-jasa/${id}`
  );
};

// ─── PENAWARAN (TENDER) ────────────────────────────────────────────────────
export const createPenawaranPembelian = (id, data, files = []) => {
  const formData = new FormData();

  safeAppend(formData, "vendorId", data.vendorId);
  safeAppend(formData, "nilaiPenawaran", data.nilaiPenawaran);
  safeAppend(formData, "keterangan", data.keterangan);

  files.forEach((file) => {
    formData.append("dokumenPenawaran", file);
  });

  return axiosConfig(
    "post",
    `/v1/pembelian/create-penawaran-pembelian-barang-jasa/${id}`,
    {
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    }
  );
};

export const deletePenawaranPembelian = (id, penawaranId) => {
  return axiosConfig(
    "delete",
    `/v1/pembelian/delete-penawaran-pembelian-barang-jasa/${id}/${penawaranId}`
  );
};

// ─── PILIH VENDOR PEMENANG ─────────────────────────────────────────────────
// Mengisi vendorId + noSpkPoSo sekaligus -> backend otomatis set statusClosing jadi "Done"
export const pilihVendorPemenangPembelian = (id, { vendorId, nilaiNegosiasi, noSpkPoSo }) => {
  return axiosConfig(
    "post",
    `/v1/pembelian/pilih-vendor-pemenang-pembelian-barang-jasa/${id}`,
    {
      data: { vendorId, nilaiNegosiasi, noSpkPoSo },
    }
  );
};

// ─── EXPORT EXCEL ────────────────────────────────────────────────────────
export const downloadExcelPembelianBarangJasa = () => {
  return axiosConfig(
    "get",
    "/v1/pembelian/pembelian-excel",
    {
      responseType: "blob",
    }
  );
};

// ─── APPROVAL (Bendahara -> Ketua Koperasi) ────────────────────────────────
export const getApprovalPembelian = (id) => {
  return axiosConfig(
    "get",
    `/v1/pembelian-approval/approval-pembelian-barang-jasa/${id}`
  );
};

export const createApprovalPembelian = (id, { action, catatan }) => {
  return axiosConfig(
    "post",
    `/v1/pembelian-approval/create-approval-pembelian-barang-jasa/${id}`,
    {
      data: { action, catatan },
    }
  );
};