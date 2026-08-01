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
  // {
  //   label: "Dashboard",
  //   icon: <HomeOutlined style={{ fontSize: '20px' }} />,
  //   url: "/home",
  //   permissions: ['superadmin', 'bendahara', 'ketua_koperasi'],
  //   style: { fontFamily: "'Poppins', sans-serif", fontWeight: 500 }
  // },
  {
    label: "Data Konten ",
    icon: <AuditOutlined style={{ fontSize: '20px' }} />,
    url: "/content",
    permissions: ['superadmin'],
    style: { fontFamily: "'Poppins', sans-serif", fontWeight: 500 }
  },

];