import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Drawer, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  { key: "/questions", icon: <UserOutlined />, label: "Questions" },
  { key: "/employees", icon: <VideoCameraOutlined />, label: "Employees" },
  { key: "/submissions", icon: <UploadOutlined />, label: "Submissions" },
  { key: "/hr-access", icon: <UploadOutlined />, label: "HR Access" },
  { key: "/reports", icon: <UploadOutlined />, label: "Reports" },
];

const SidebarContent = ({ onNavigate, collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = ({ key }) => {
    navigate(key);
    onNavigate?.();
  };

  return (
    <>
      <div style={{ padding: 16, textAlign: "center" }}>
        <img
          src="https://tdimg.techdogs.com/assets/techdogs-light.webp"
          alt="Logo"
          style={{ width: collapsed ? 50 : 180 }}
        />
      </div>

      <Menu
        theme="light"
        selectedKeys={[location.pathname]}
        onClick={handleClick}
        items={menuItems}
        style={{ marginTop: 15 }}
      />
    </>
  );
};

export const Sidebar = ({ collapsed }) => (
  <Sider
    trigger={null}
    collapsible
    collapsed={collapsed}
    width={220}
    style={{
      position: "fixed",
      height: "100vh",
      background: "#fff",
      zIndex: 100,
    }}
  >
    <SidebarContent collapsed={collapsed} />
  </Sider>
);

export const MobileSidebar = ({ open, onClose }) => (
  <Drawer
    placement="left"
    open={open}
    onClose={onClose}
    bodyStyle={{ padding: 0 }}
    width={220}
  >
    <SidebarContent onNavigate={onClose} />
  </Drawer>
);
