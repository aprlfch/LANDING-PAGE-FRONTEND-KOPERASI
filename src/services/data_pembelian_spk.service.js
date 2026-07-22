import { axiosConfig } from "../helper/config";

// ─── SPK/PO/SO ───────────────────────────────────────────────────────────
// Dibuat setelah vendor pemenang dipilih. Alur: create (draft) ->
// update (opsional, selama draft) -> upload dokumen approve (status jadi Done)

export const createSpkPembelian = (id, data) => {
  return axiosConfig(
    "post",
    `/v1/pembelianSPK/create-spk-pembelian-barang-jasa/${id}`,
    {
      data: {
        jenisDokumen: data.jenisDokumen,               // "SPK" | "PO" | "SO"
        nomorDokumen: data.nomorDokumen,               // wajib
        tempatPenerbitan: data.tempatPenerbitan,
        tanggalPenerbitan: data.tanggalPenerbitan,
        namaPenandatangan: data.namaPenandatangan,
        jabatanPenandatangan: data.jabatanPenandatangan,
        alamatPenandatangan: data.alamatPenandatangan,
        namaPenandatanganVendor: data.namaPenandatanganVendor,
        jabatanPenandatanganVendor: data.jabatanPenandatanganVendor,
        namaPekerjaan: data.namaPekerjaan,
        hargaPekerjaan: data.hargaPekerjaan,           // kosongkan -> pakai nilaiNegosiasi
        termasukPpn: data.termasukPpn,                 // boolean
        syaratPekerjaan: data.syaratPekerjaan,         // string multi-baris
        syaratSelesai: data.syaratSelesai,
        caraPembayaran: data.caraPembayaran,
        sanksiKeterlambatan: data.sanksiKeterlambatan,
        masaPerawatanHari: data.masaPerawatanHari,
        tanggalMulai: data.tanggalMulai,
        tanggalSelesai: data.tanggalSelesai,
        // terbilang,
        // waktuPelaksanaanHari
      },
    }
  );
};

export const updateSpkPembelian = (id, data) => {
  return axiosConfig(
    "put",
    `/v1/pembelianSPK/update-spk-pembelian-barang-jasa/${id}`,
    { data }
  );
};

// Upload dokumen SPK yang sudah ditandatangani/di-approve.
// Backend otomatis: spk.status = "approved", pembelian.statusClosing = "Done",
// dan membuat record approval (bendahara -> ketua).
export const uploadDokumenSpkPembelian = (id, files = []) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("dokumenPath", file);
  });

  return axiosConfig(
    "post",
    `/v1/pembelianSPK/upload-dokumen-spk-pembelian-barang-jasa/${id}`,
    {
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    }
  );
};

export const getSpkPembelian = (id) => {
  return axiosConfig(
    "get",
    `/v1/pembelianSPK/get-spk-pembelian-barang-jasa/${id}`
  );
};