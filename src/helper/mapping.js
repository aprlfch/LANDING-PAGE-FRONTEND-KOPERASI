import { formatRupiah } from "./formatter";

export const mapDataAllocationToExcel = (item) => {
  const parseNumber = (value) => (value != null && !isNaN(value) ? Number(value) : 0);

  return {
    Keterangan: item.gl_name || "",
    "GL SAP": item.gl_code || "",
    // Anggaran: formatRupiah(parseNumber(item.total_amount || 0)),
    Anggaran: item.total_amount || 0,
    Komitmen: item.commitment_amount || 0,
    "PO/SPK/SP": item.quote_amount || 0,
    Realisasi: item.realized_amount || 0,
    Total: item.total_commitment_amount || 0,
    Sisa: item.remaining_amount || 0,
    Persentase: item.percentage || "-",
  };
};

export const mapDataCommitmentToExcel = (item) => {
  console.log(item);
  return {
    Tipe: item.commitment_type || "-",
    "No PP/PPP/UM": item.commitment_number || "-",
    "Tgl Masuk": item.commitment_date || "-",
    "Internal Order": item.internal_order || "-",
    "Tipe Internal Order": item.internal_order_type | "-",
    "GL Account": (item.gl_account?.code || "") + "-" + (item.gl_account?.name || ""),
    "Cost Center": (item.cost_center?.code || "") + "-" + (item.cost_center?.name || ""),
    // Komitmen: formatRupiah(item.commitment || 0),
    "Jumlah Komitmen": item.commitment | "-",
    Keterangan: item.description || "-",
    "Alasan Ditolak": item.reject_reason | "",
    "Register Number": item.registered_number || "-",
    "Sisa Komitmen": item.remaining_commitment || "-",
    "Dibuat Oleh": item.created_by?.fullname || "-",
    "Nomor SAP": item.realized_data?.[0]?.sap_number || "-",
    "Nomor Invoice": item.realized_data?.[0]?.invoice_number || "-",
    "Tanggal Realisasi Jurnal": item.realized_data?.[0]?.realized_date || "-",
    "Keterangan Realisasi": item.realized_data?.[0]?.description || "-",
    Realisasi: item.realized_amount || "-",
    Status: item.commitment_status?.label || "-",
    "Nomor Referensi SPK/PO": item.reference_number || "-",
    "Tanggal SPK/PO": item.spk_date || "-",
    "Keterangan SPK/PO": item.description_spk || "-",
    "Penawaran": item.quote || "-",
    "Nama Vendor": item.vendor || "-",
  };
};

export const mapDataCommitmentToExcelFull = (item) => {
  return {
    Tipe: item.commitment_type || "-",
    "No PP/PPP/UM": item.commitment_number || "-",
    "Jumlah Komitmen": item.commitment | "-",
    "Tgl Masuk": item.commitment_date || "-",
    "Internal Order": item.internal_order || "-",
    "Tipe Internal Order": item.internal_order_type | "-",
    "GL Account": (item.gl_account?.code || "") + "-" + (item.gl_account?.name || ""),
    "Cost Center": (item.cost_center?.code || "") + "-" + (item.cost_center?.name || ""),
    // Komitmen: formatRupiah(item.commitment || 0),
    "Jumlah Komitmen": item.commitment | "-",
    Keterangan: item.description || "-",
    "Alasan Ditolak": item.reject_reason | "",
    "Register Number": item.registered_number || "-",
    "Sisa Komitmen": item.remaining_commitment || "-",
    "Dibuat Oleh": item.created_by?.fullname || "-",
    "Nomor SAP": item.realized_data?.[0]?.sap_number || "-",
    "Nomor Invoice": item.realized_data?.[0]?.invoice_number || "-",
    "Tanggal Realisasi Jurnal": item.realized_data?.[0]?.realized_date || "-",
    "Keterangan Realisasi": item.realized_data?.[0]?.description || "-",
    Realisasi: item.realized_amount || "-",
    Status: item.commitment_status?.label || "-",
    "Nomor Referensi SPK/PO": item.reference_number || "-",
    "Tanggal SPK/PO": item.spk_date || "-",
    "Keterangan SPK/PO": item.description || "-",
    "Penawaran": item.quote || "-",
    "Nama Vendor": item.vendor || "-",
  };
};

export const mapAndSortStatusData = (data) => {
  const statusMapping = {
    all: "Semua",
    new: "Baru Dibuat",
    requesting: "Permintaan Pengajuan",
    waiting_verification_by_admin: "Menunggu Konfirmasi Admin",
    completed: "Selesai",
    letter_accepted: "Pengajuan Disetujui",
    letter_rejected: "Pengajuan Ditolak",
    waiting_verification_spk: "Menunggu Verifikasi SPK",
    spk_accepted: "SPK Disetujui",
    spk_rejected: "SPK Ditolak",
    pengajuan: "Diajukan",
  };

  return data
    .map((item) => ({
      label: statusMapping[item.value] || item.label,
      value: item.value,
    }))
    .sort((a, b) => {
      const order = ["all", "pengajuan", "new", "requesting", "waiting_verification_by_admin", "letter_accepted", "letter_rejected", "waiting_verification_spk", "spk_accepted", "spk_rejected", "completed"];
      return order.indexOf(a.value) - order.indexOf(b.value);
    });
};

export function groupingAllocationDataByAllocationType(data) {
  const kelompok = {
    "A. Rutin": [],
    "B. Dikelola": [],
    "C. Investasi": [],
    "D. Lainnya": [],
  };

  data.forEach((item) => {
    let allocationType = item.allocation_type;

    // Jika allocationType null/undefined/array kosong, jadikan "D. Lainnya"
    if (!allocationType || (Array.isArray(allocationType) && allocationType.length === 0)) {
      allocationType = "D. Lainnya";
    } else {
      // Mapping allocationType ke grup yang sesuai
      allocationType = allocationType.toLowerCase();
      if (allocationType === "rutin") allocationType = "A. Rutin";
      else if (allocationType === "dikelola") allocationType = "B. Dikelola";
      else if (allocationType === "investasi") allocationType = "C. Investasi";
      else allocationType = "D. Lainnya";
    }

    // Masukkan item ke dalam kelompok yang sesuai
    if (Object.prototype.hasOwnProperty.call(kelompok, allocationType)) {
      kelompok[allocationType].push(item);
    } else {
      kelompok["D. Lainnya"].push(item);
    }
  });

  return kelompok;
}

export function mappingAllocationDataWithAllocationType(dataKelompok) {
  const hasilRemap = [];
  const parseNumber = (value) => (value != null && !isNaN(value) ? Number(value) : 0);

  Object.keys(dataKelompok).forEach((allocationType) => {
    hasilRemap.push({
      Keterangan: allocationType || "",
      "Cost Center": "",
      "GL SAP": "",
      Anggaran: "",
      Komitmen: "",
      "PO/SPK/SP": "",
      Realisasi: "",
      Total: "",
      Sisa: "",
      Persentase: "",
    });

    console.log(dataKelompok);

    const items = dataKelompok[allocationType];
    items.forEach((item) => {
      hasilRemap.push({
        Keterangan: item.gl_name || "",
        "Cost Center": item.cost_center_name || "",
        "GL SAP": item.gl_code || "",
        // Anggaran: formatRupiah(parseNumber(item.total_amount || 0)),
        Anggaran: item.total_amount || 0,
        Komitmen: item.commitment_amount || 0,
        "PO/SPK/SP": item.quote_amount || 0,
        Realisasi: item.realized_amount || 0,
        Total: item.total_commitment_amount || 0,
        Sisa: item.remaining_amount || 0,
        Persentase: item.percentage + "%" || "-",
      });
    });
  });

  return hasilRemap;
}

export const mapDataSPKToExcel = (item) => {
  const parseNumber = (value) => (value != null && !isNaN(value) ? Number(value) : 0);

  return {
    "Nomor Referensi": item.reference_number || "",
    "Tanggal SPK/PO": item.spk_date || "",
    "Penawaran PO/SPK": formatRupiah(parseNumber(item.quote || 0)),
    Deskripsi: item.description || "",
    Vendor: item.vendor || "",
  };
};
