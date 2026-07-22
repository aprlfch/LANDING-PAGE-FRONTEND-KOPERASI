export const rbacData = [
  {
    id: 1,
    name: "administrator",
    permissions: ["write_allocation_glaccount", "export_data", "delete_commitment", "export_spk"],
  },
  {
    id: 2,
    name: "director",
    permissions: ["verify_first_commitment", "export_data", "export_spk"],
  },
  {
    id: 3,
    name: "manager",
    permissions: ["verify_first_commitment", "export_data", "export_spk"],
  },
  {
    id: 4,
    name: "head_division",
    permissions: ["verify_first_commitment", "export_data", "export_spk"],
  },
  {
    id: 5,
    name: "admin_verificator",
    permissions: ["verify_second_commitment", "verify_spk", "export_data", "export_spk"],
  },
  {
    id: 6,
    name: "admin_finance",
    permissions: ["verify_second_commitment", "verify_spk", "write_realisation", "write_realisation_um/pc", "export_data", "export_spk", "mark_payment_um"],
  },
  {
    id: 8,
    name: "admin_logistic",
    permissions: ["write_spk", "write_attachment", "write_commitment", "export_data", "write_attachment_spk", "export_spk"],
  },
  {
    id: 9,
    name: "user",
    permissions: ["request_commitment", "write_letter", "write_commitment", "write_attachment", "delete_commitment", "export_data", "write_attachment_spk", "export_spk"],
  },
  {
    id: 10,
    name: "secretary",
    permissions: ["verify_first_commitment", "export_data", "export_spk"],
  },
  {
    id: 11,
    name: "lead_verificator",
    permissions: ["export_data", "export_spk"],
  },
  {
    id: 14,
    name: "staf",
    permissions: ["verify_first_commitment", "export_data", "export_spk"],
  },
];
