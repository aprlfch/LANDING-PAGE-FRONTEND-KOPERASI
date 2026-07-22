export const fakturPajakFormField = [
    {
        key: 1,
        label: "Customer",
        name: "customer_id",
        value: "",
        type: "select",
        placeholder: "Pilih Customer",
        options: [],
        required: true
    },
    {
        key: 2,
        label: "Nomor Invoice",
        name: "nomor_invoice",
        value: "",
        type: "text",
        placeholder: "Masukkan Nomor Invoice (contoh: 0001/INV/KIE-JKT/01/2025)",
        required: true
    },
    {
        key: 3,
        label: "NPWP",
        name: "npwp",
        value: "",
        type: "text",
        placeholder: "Masukkan NPWP",
        required: true
    },
    {
        key: 4,
        label: "No Faktur",
        name: "no_faktur",
        value: "",
        type: "text",
        placeholder: "Masukkan Nomor Faktur Pajak",
        required: true
    },
    {
        key: 5,
        label: "DPP",
        name: "dpp",
        value: "",
        type: "number",
        placeholder: "Masukkan DPP (Jangan Pakai Titik)",
        required: true
    },
    {
        key: 6,
        label: "Tanggal Faktur",
        name: "tanggal_faktur",
        value: "",
        type: "date",
        placeholder: "Pilih Tanggal Faktur",
        required: true
    },
    {
        key: 7,
        label: "Status",
        name: "status",
        value: "",
        type: "select",
        placeholder: "Pilih Status",
        options: [
            { label: "Normal", value: "Normal" },
            { label: "Batal", value: "Batal" },
            { label: "Diganti", value: "Diganti" },
            { label: "Pengganti", value: "Pengganti" },
        ],
        required: true
    },
    {
        key: 8,
        label: "File Faktur Pajak (PDF)",
        name: "file_faktur_pajak",
        value: "",
        type: "file",
        placeholder: "Upload File PDF",
        required: true
    },
];