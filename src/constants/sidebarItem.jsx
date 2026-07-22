import {
  HomeOutlined,
  TeamOutlined,
  FileTextOutlined,
  AuditOutlined,
  ShopOutlined,
  BankOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

export const sidebarItems = [
  {
    label: "Dashboard",
    icon: <HomeOutlined style={{ fontSize: '20px' }} />,
    url: "/home",
    permissions: ['superadmin', 'bendahara', 'ketua_koperasi'],
    style: { fontFamily: "'Poppins', sans-serif", fontWeight: 500 }
  },
  {
    label: "Data",
    icon: <FileTextOutlined style={{ fontSize: '20px' }} />,
    permissions: ['superadmin', 'bendahara', 'ketua_koperasi'],
    style: { fontFamily: "'Poppins', sans-serif", fontWeight: 500 },
    children: [
      {
        label: "Penjualan",
        icon: <ShopOutlined style={{ fontSize: '18px' }} />,
        url: "/data-penjualan",
        permissions: ['superadmin', 'koordinator', 'danru', 'karu', 'bendahara', 'ketua_koperasi'],
        style: { fontFamily: "'Poppins', sans-serif", fontWeight: 400 }
      },
      {
        label: "Pembelian",
        icon: <BankOutlined style={{ fontSize: '18px' }} />,
        url: "/data-pembelian",
        permissions: ['superadmin', 'koordinator', 'danru', 'karu', 'bendahara', 'ketua_koperasi'],
        style: { fontFamily: "'Poppins', sans-serif", fontWeight: 400 }
      }
    ]
  },
  {
    label: "Data Vendor",
    icon: <AuditOutlined style={{ fontSize: '20px' }} />,
    url: "/vendor",
    permissions: ['superadmin'],
    style: { fontFamily: "'Poppins', sans-serif", fontWeight: 500 }
  },
  {
    label: "Pengguna",
    icon: <TeamOutlined style={{ fontSize: '20px' }} />,
    url: "/user",
    permissions: ['superadmin'],
    style: { fontFamily: "'Poppins', sans-serif", fontWeight: 500 }
  },
];