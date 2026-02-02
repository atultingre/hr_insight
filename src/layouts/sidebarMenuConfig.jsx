import {
  FileTextOutlined,
  TeamOutlined,
  SendOutlined,
  SafetyCertificateOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

export const HR_ADMIN_MENU = [
  {
    key: "/hr-admin/questionnaires",
    icon: <FileTextOutlined />,
    label: "Questionnaires",
    roles: ["hr_admin"],
  },
  {
    key: "/hr-admin/employees",
    icon: <TeamOutlined />,
    label: "Employees",
    roles: ["hr_admin"],
  },
  {
    key: "/hr-admin/submissions",
    icon: <SendOutlined />,
    label: "Submissions",
    roles: ["hr_admin"],
  },
  {
    key: "/hr-admin/hr-access",
    icon: <SafetyCertificateOutlined />,
    label: "HR Access",
    roles: ["hr_admin"],
  },
  {
    key: "/hr-admin/reports",
    icon: <BarChartOutlined />,
    label: "Reports",
    roles: ["hr_admin"],
  },
];
