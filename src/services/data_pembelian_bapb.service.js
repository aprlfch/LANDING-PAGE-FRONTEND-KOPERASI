import { axiosConfig } from "../helper/config";

// ─── BAPB (Berita Acara Pemeriksaan Barang) ───────────────────────────────
// Dibuat setelah PO ber-status "approved".
// Alur: create (draft) -> upload dokumen bertandatangan -> approved

export const createBapbPembelian = (id, data) => {
  return axiosConfig(
    "post",
    `/v1/pembelian-bapb/create-bapb-pembelian-barang-jasa/${id}`,
    {
      data: {
        poId: data.poId,

        uraianBarang: data.uraianBarang,
        pemasok: data.pemasok,

        namaPenandatanganPihakPertama: data.namaPenandatanganPihakPertama,
        jabatanPenandatanganPihakPertama: data.jabatanPenandatanganPihakPertama,

        penerima: data.penerima,
        namaPenandatanganPihakKedua: data.namaPenandatanganPihakKedua,
        jabatanPenandatanganPihakKedua: data.jabatanPenandatanganPihakKedua,

        tanggalPenerimaan: data.tanggalPenerimaan,
        persentaseDiterima: data.persentaseDiterima,
        kondisiBarang: data.kondisiBarang,
        tempatPenerimaan: data.tempatPenerimaan,

        tempatPembuatan: data.tempatPembuatan,
        tanggalPembuatan: data.tanggalPembuatan,
      },
    }
  );
};

export const updateBapbPembelian = (id, bapbId, data) => {
  return axiosConfig(
    "put",
    `/v1/pembelian-bapb/update-bapb-pembelian-barang-jasa/${id}/${bapbId}`,
    {
      data: {
        uraianBarang: data.uraianBarang,
        nomorPo: data.nomorPo,
        tanggalPo: data.tanggalPo,
        pemasok: data.pemasok,

        namaPenandatanganPihakPertama: data.namaPenandatanganPihakPertama,
        jabatanPenandatanganPihakPertama: data.jabatanPenandatanganPihakPertama,

        penerima: data.penerima,
        namaPenandatanganPihakKedua: data.namaPenandatanganPihakKedua,
        jabatanPenandatanganPihakKedua: data.jabatanPenandatanganPihakKedua,

        tanggalPenerimaan: data.tanggalPenerimaan,
        persentaseDiterima: data.persentaseDiterima,
        kondisiBarang: data.kondisiBarang,
        tempatPenerimaan: data.tempatPenerimaan,

        tempatPembuatan: data.tempatPembuatan,
        tanggalPembuatan: data.tanggalPembuatan,
      },
    }
  );
};

export const listBapbPembelian = (id) => {
  return axiosConfig(
    "get",
    `/v1/pembelian-bapb/list-bapb-pembelian-barang-jasa/${id}`
  );
};

// Upload dokumen BAPB yang sudah ditandatangani.
// Backend otomatis mengubah status menjadi "approved".
export const uploadDokumenBapbPembelian = (id, bapbId, files = []) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("dokumenPath", file);
  });

  return axiosConfig(
    "post",
    `/v1/pembelian-bapb/upload-dokumen-bapb-pembelian-barang-jasa/${id}/${bapbId}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    }
  );
};

export const closeBapbPembelian = (id) => {
  return axiosConfig(
    "post",
    `/v1/pembelian-bapb/close-bapb-pembelian-barang-jasa/${id}`
  );
};

export const getBapbById = (bapbId) => {
  return axiosConfig(
    "get",
    `/v1/pembelian-bapb/get-bapb-by-id-pembelian-barang-jasa/${bapbId}`
  );
};

export const deleteBapbPembelian = (id, bapbId) => {
  return axiosConfig(
    "delete",
    `/v1/pembelian-bapb/delete-bapb-pembelian-barang-jasa/${id}/${bapbId}`
  );
};