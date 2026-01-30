import {
  FileTextOutlined,
  TeamOutlined,
  SendOutlined,
  SafetyCertificateOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useTheme } from "../theme/ThemeContext";

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

  const logoSrc = collapsed ? logos[mode].collapsed : logos[mode].full;

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
        items={[
          { key: "1", icon: <FileTextOutlined />, label: "Questionnaires" },
          { key: "2", icon: <TeamOutlined />, label: "Employees" },
          { key: "3", icon: <SendOutlined />, label: "Submissions" },
          { key: "4", icon: <SafetyCertificateOutlined />, label: "HR Access" },
          { key: "5", icon: <BarChartOutlined />, label: "Reports" },
        ]}
      />
    </Sider>
  );
};

export default AppSidebar;
