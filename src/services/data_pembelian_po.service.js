import { axiosConfig } from "../helper/config";

// ─── PO (Order Pembelian) ───────────────────────────────────────────────
// Dibuat setelah vendor pemenang dipilih. Alur: create (draft) ->
// update (opsional, selama draft) -> upload dokumen approve (status jadi Done)

export const createPoPembelian = (id, data) => {
  return axiosConfig(
    "post",
    `/v1/pembelianPO/create-po-pembelian-barang-jasa/${id}`,
    {
      data: {
        nomorDokumen: data.nomorDokumen,               // wajib
        costCode: data.costCode,
        tempatPenerbitan: data.tempatPenerbitan,
        tanggalPenerbitan: data.tanggalPenerbitan,
        teleponVendor: data.teleponVendor,
        faxVendor: data.faxVendor,
        nilaiOrder: data.nilaiOrder,                   // kosongkan -> pakai nilaiNegosiasi
        waktuPenyerahan: data.waktuPenyerahan,
        tempatPenyerahan: data.tempatPenyerahan,
        syaratPembayaran: data.syaratPembayaran,
        content: data.content,                         // "Keterangan" (multi-baris)
        notes: data.notes,
        terms: data.terms,                             // "PERSYARATAN" (multi-baris)
        namaPenandatangan: data.namaPenandatangan,
        jabatanPenandatangan: data.jabatanPenandatangan,
        // terbilang dihitung otomatis oleh backend
      },
    }
  );
};

export const updatePoPembelian = (id, data) => {
  return axiosConfig(
    "put",
    `/v1/pembelianPO/update-po-pembelian-barang-jasa/${id}`,
    { data }
  );
};

// Upload dokumen PO yang sudah ditandatangani/di-approve.
// Backend otomatis: po.status = "approved", pembelian.statusClosing = "Done",
// dan membuat record approval (bendahara -> ketua).
export const uploadDokumenPoPembelian = (id, files = []) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("dokumenPath", file);
  });

  return axiosConfig(
    "post",
    `/v1/pembelianPO/upload-dokumen-po-pembelian-barang-jasa/${id}`,
    {
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    }
  );
};

export const getPoPembelian = (id) => {
  return axiosConfig(
    "get",
    `/v1/pembelianPO/get-po-pembelian-barang-jasa/${id}`
  );
};
