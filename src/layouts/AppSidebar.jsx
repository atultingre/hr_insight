
import {
  FileTextOutlined,
  TeamOutlined,
  SendOutlined,
  SafetyCertificateOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useTheme } from "../theme/ThemeContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext";
import { HR_ADMIN_MENU } from "./sidebarMenuConfig";

const { Sider } = Layout;

const logos = {
  light: {
    full: "https://tdimg.techdogs.com/assets/techdogs-light.webp",
    collapsed: "./logos/td-dark.png",
  },
  dark: {
    full: "https://tdimg.techdogs.com/assets/techdogs.webp",
    collapsed: "./logos/td-light.png",
  },
};

const AppSidebar = ({ collapsed, SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH }) => {
  const { mode } = useTheme(); // 🔥 theme from context
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const logoSrc = collapsed ? logos[mode].collapsed : logos[mode].full;

  const filteredMenu = HR_ADMIN_MENU.filter(item =>
    item.roles.includes(user.role)
  );

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={SIDEBAR_WIDTH}
      collapsedWidth={SIDEBAR_COLLAPSED_WIDTH}

      style={{
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        height: "100vh",
      }}

    >
      {/* LOGO */}
      <div
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          padding: collapsed ? 0 : "0 16px",
          backgroundColor: mode === "light" && "#fff",
        }}
      >
        <img
          src={logoSrc}
          alt="TD Logo"
          style={{
            height: 32,
            transition: "all 0.3s ease",
            objectFit: "contain",
          }}
        />
      </div>

      <Menu
        mode="inline"
        style={{ height: "100%", borderRight: 0 }}
        selectedKeys={[location.pathname]}
        onClick={({ key }) => navigate(key)}
        items={filteredMenu}
      />
    </Sider>
  );
};

export default AppSidebar;
