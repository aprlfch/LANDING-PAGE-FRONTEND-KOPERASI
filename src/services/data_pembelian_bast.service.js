import { axiosConfig } from "../helper/config";

// ─── BAST (Berita Acara Serah Terima) ─────────────────────────────────────
// Dibuat setelah SPK/PO/SO ber-status "approved". Alur: create (draft) ->
// upload dokumen yang sudah ditandatangani (status jadi "approved")

export const createBastPembelian = (id, data) => {
  return axiosConfig(
    "post",
    `/v1/pembelian-bast/create-bast-pembelian-barang-jasa/${id}`,
    {
      data: {
        progressPersen: data.progressPersen,                             // wajib
        tanggalSerahTerima: data.tanggalSerahTerima,                     // wajib
        durasiHari: data.durasiHari,
        tanggalMulai: data.tanggalMulai,
        tanggalSelesai: data.tanggalSelesai,
        tempatPembuatan: data.tempatPembuatan,
        tanggalPembuatan: data.tanggalPembuatan,
        kontraktorPelaksana: data.kontraktorPelaksana,                   // opsional, fallback ke nama vendor SPK
        pemberiKerja: data.pemberiKerja,                                 // opsional, default "Koperasi KIE"
        namaPenandatanganPihakPertama: data.namaPenandatanganPihakPertama,
        jabatanPenandatanganPihakPertama: data.jabatanPenandatanganPihakPertama,
        namaPenandatanganPihakKedua: data.namaPenandatanganPihakKedua,
        jabatanPenandatanganPihakKedua: data.jabatanPenandatanganPihakKedua,
      },
    }
  );
};

export const updateBastPembelian = (id, bastId, data) => {
  return axiosConfig(
    "put",
    `/v1/pembelian-bast/update-bast-pembelian-barang-jasa/${id}/${bastId}`,
    {
      data: {
        progressPersen: data.progressPersen,
        tanggalSerahTerima: data.tanggalSerahTerima,
        durasiHari: data.durasiHari,
        tanggalMulai: data.tanggalMulai,
        tanggalSelesai: data.tanggalSelesai,
        tempatPembuatan: data.tempatPembuatan,
        tanggalPembuatan: data.tanggalPembuatan,
        kontraktorPelaksana: data.kontraktorPelaksana,
        pemberiKerja: data.pemberiKerja,
        namaPenandatanganPihakPertama: data.namaPenandatanganPihakPertama,
        jabatanPenandatanganPihakPertama: data.jabatanPenandatanganPihakPertama,
        namaPenandatanganPihakKedua: data.namaPenandatanganPihakKedua,
        jabatanPenandatanganPihakKedua: data.jabatanPenandatanganPihakKedua,
      },
    }
  );
};

export const listBastPembelian = (id) => {
  return axiosConfig(
    "get",
    `/v1/pembelian-bast/list-bast-pembelian-barang-jasa/${id}`
  );
};

// Upload dokumen BAST yang sudah ditandatangani.
// Backend otomatis: bast.status = "approved"
export const uploadDokumenBastPembelian = (id, bastId, files = []) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("dokumenPath", file);
  });

  return axiosConfig(
    "post",
    `/v1/pembelian-bast/upload-dokumen-bast-pembelian-barang-jasa/${id}/${bastId}`,
    {
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    }
  );
};

export const closeBastPembelian = (id) => {
  return axiosConfig(
    "post",
    `/v1/pembelian-bast/close-bast-pembelian-barang-jasa/${id}`
  );
};

export const getBastById = (bappId) => {
  return axiosConfig(
    "get",
    `/v1/pembelian-bast/get-bast-by-id-pembelian-barang-jasa/${bappId}`
  );
};

export const deleteBastPembelian = (id, bastId) => {
  return axiosConfig(
    "delete",
    `/v1/pembelian-bast/delete-bast-pembelian-barang-jasa/${id}/${bastId}`
  );
};