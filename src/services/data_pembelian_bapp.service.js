import { axiosConfig } from "../helper/config";

// ─── BAPP (Berita Acara Pemeriksaan Pekerjaan) ────────────────────────────
// Dibuat setelah SPK/PO/SO ber-status "approved". Alur: create (draft) ->
// upload dokumen yang sudah ditandatangani (status jadi "approved")

export const createBappPembelian = (id, data) => {
  return axiosConfig(
    "post",
    `/v1/pembelian-bapp/create-bapp-pembelian-barang-jasa/${id}`,
    {
      data: {
        lokasi: data.lokasi,                                   // opsional, fallback ke lokasi pembelian
        pelaksana: data.pelaksana,
        namaPihakPertama: data.namaPihakPertama,
        jabatanPihakPertama: data.jabatanPihakPertama,
        alamatPihakPertama: data.alamatPihakPertama,
        namaPenandatanganPertama: data.namaPenandatanganPertama,
        jabatanPenandatanganPertama: data.jabatanPenandatanganPertama,
        namaPihakKedua: data.namaPihakKedua,                    // opsional, fallback ke nama vendor SPK
        jabatanPihakKedua: data.jabatanPihakKedua,
        alamatPihakKedua: data.alamatPihakKedua,                // opsional, fallback ke alamat vendor SPK
        namaPenandatanganKedua: data.namaPenandatanganKedua,
        jabatanPenandatanganKedua: data.jabatanPenandatanganKedua,
        hariPenyerahan: data.hariPenyerahan,
        tanggalPenyerahan: data.tanggalPenyerahan,              // wajib
        pembayaranKe: data.pembayaranKe,                        // opsional, default "Koperasi KIE"
        hargaDibayarkan: data.hargaDibayarkan,                  // wajib
        termasukPpn: data.termasukPpn,
        kategoriPph: data.kategoriPph,                        // boolean
        terbilang: data.terbilang,
        tempatPenerbitan: data.tempatPenerbitan,
        tanggalPenerbitan: data.tanggalPenerbitan,
      },
    }
  );
};

export const updateBappPembelian = (id, bappId, data) => {
  return axiosConfig(
    "put",
    `/v1/pembelian-bapp/update-bapp-pembelian-barang-jasa/${id}/${bappId}`,
    {
      data: {
        lokasi: data.lokasi,
        pelaksana: data.pelaksana,
        namaPihakPertama: data.namaPihakPertama,
        jabatanPihakPertama: data.jabatanPihakPertama,
        alamatPihakPertama: data.alamatPihakPertama,
        namaPenandatanganPertama: data.namaPenandatanganPertama,
        jabatanPenandatanganPertama: data.jabatanPenandatanganPertama,
        namaPihakKedua: data.namaPihakKedua,
        jabatanPihakKedua: data.jabatanPihakKedua,
        alamatPihakKedua: data.alamatPihakKedua,
        namaPenandatanganKedua: data.namaPenandatanganKedua,
        jabatanPenandatanganKedua: data.jabatanPenandatanganKedua,
        hariPenyerahan: data.hariPenyerahan,
        tanggalPenyerahan: data.tanggalPenyerahan,
        pembayaranKe: data.pembayaranKe,
        hargaDibayarkan: data.hargaDibayarkan,
        termasukPpn: data.termasukPpn,
        kategoriPph: data.kategoriPph,
        terbilang: data.terbilang,
        tempatPenerbitan: data.tempatPenerbitan,
        tanggalPenerbitan: data.tanggalPenerbitan,
      },
    }
  );
};

export const listBappPembelian = (id) => {
  return axiosConfig(
    "get",
    `/v1/pembelian-bapp/list-bapp-pembelian-barang-jasa/${id}`
  );
};

// Upload dokumen BAPP yang sudah ditandatangani.
// Backend otomatis: bapp.status = "approved"
export const uploadDokumenBappPembelian = (id, bappId, files = []) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("dokumenPath", file);
  });

  return axiosConfig(
    "post",
    `/v1/pembelian-bapp/upload-dokumen-bapp-pembelian-barang-jasa/${id}/${bappId}`,
    {
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    }
  );
};

export const closeBappPembelian = (id) => {
  return axiosConfig(
    "post",
    `/v1/pembelian-bapp/close-bapp-pembelian-barang-jasa/${id}`
  );
};

export const getBappById = (bappId) => {
  return axiosConfig(
    "get",
    `/v1/pembelian-bapp/get-bapp-by-id-pembelian-barang-jasa/${bappId}`
  );
};

export const deleteBappPembelian = (id, bappId) => {
  return axiosConfig(
    "delete",
    `/v1/pembelian-bapp/delete-bapp-pembelian-barang-jasa/${id}/${bappId}`
  );
};