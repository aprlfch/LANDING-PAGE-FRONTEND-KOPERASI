export const actionPermissionBaseOnStatus = [
  {
    id: 1, // used
    name: "write_letter",
    permissions: ["new", "letter_rejected"],
  },
  {
    id: 2, // used
    name: "btn_commitment_requesting",
    permissions: ["new", "letter_rejected"],
  },
  {
    id: 3,
    name: "btn_spk_verification",
    permissions: ["letter_accepted", "spk_rejected"],
  },
  {
    id: 4,
    name: "btn_commitment_first_verification",
    permissions: ["requesting"],
  },
  {
    id: 5,
    name: "btn_commitment_second_verification",
    permissions: ["waiting_verification_by_admin"],
  },
  {
    id: 6,
    name: "btn_request_spk",
    permissions: ["letter_accepted", "spk_rejected", "waiting_proceed_quote"],
  },
  {
    id: 7,
    name: "btn_verify_spk",
    permissions: ["waiting_verification_quote"],
  },
  {
    id: 8,
    name: "write_spk",
    permissions: ["letter_accepted", "spk_rejected", "waiting_proceed_quote"],
  },
  {
    id: 8,
    name: "write_realisation",
    permissions: ["quote_accepted", "realized_proceed"],
  },
  {
    id: 8,
    name: "write_realisation_um/pc",
    permissions: ["letter_accepted", "realized_proceed"],
  },
  {
    id: 9,
    name: "btn_close_commitment",
    permissions: ["realized"],
  },
  {
    id: 10,
    name: "delete_commitment",
    permissions: ["new", "requesting", "letter_rejected"],
  },
  {
    id: 10,
    name: "write_attachment",
    permissions: ["new", "letter_rejected"],
  },
  {
    id: 8,
    name: "write_realisation_um",
    permissions: ["letter_accepted"],
  },
  {
    id: 8,
    name: "write_attachment_spk",
    permissions: ["letter_accepted"],
  },
  {
    id: 8,
    name: "export_spk",
    permissions: ["letter_accepted", "quote_accepted", "realized_proceed", "realized", "spk_rejected", "waiting_proceed_quote", "waiting_verification_quote"],
  },
];
