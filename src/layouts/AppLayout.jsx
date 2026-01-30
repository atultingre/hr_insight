import { Layout } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext";
import AppContent from "./AppContent";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";

const { Header, Sider, Content } = Layout;

const HEADER_HEIGHT = 64;
const SIDEBAR_WIDTH = 200;
const SIDEBAR_COLLAPSED_WIDTH = 80;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Layout style={{ height: "100vh" }}>
      {/* Fixed Sidebar */}
      <AppSidebar
        collapsed={collapsed}
        SIDEBAR_WIDTH={SIDEBAR_WIDTH}
        SIDEBAR_COLLAPSED_WIDTH={SIDEBAR_COLLAPSED_WIDTH}
      />

      {/* Main Layout */}
      <Layout
        style={{
          marginLeft: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
        }}
      >
        {/* Fixed Header */}
        <AppHeader
          collapsed={collapsed}
          handleLogout={handleLogout}
          SIDEBAR_COLLAPSED_WIDTH={SIDEBAR_COLLAPSED_WIDTH}
          SIDEBAR_WIDTH={SIDEBAR_WIDTH}
          HEADER_HEIGHT={HEADER_HEIGHT}
          setCollapsed={setCollapsed}
        />

        {/* Scrollable Content */}
        <AppContent HEADER_HEIGHT={HEADER_HEIGHT} />
      </Layout>
    </Layout>
  );
};

export default AppLayout;
