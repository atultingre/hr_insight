import { Layout, Button, Menu, Space, ConfigProvider } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useAuth } from "../state/AuthContext";
import ThemeToggle from "../components/ThemeToggle";

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
        <Menu
          mode="inline"
          style={{ height: "100%", borderRight: 0 }}
          items={[
            { key: "1", icon: <UserOutlined />, label: "nav 1" },
            { key: "2", icon: <VideoCameraOutlined />, label: "nav 2" },
            { key: "3", icon: <UploadOutlined />, label: "nav 3" },
          ]}
        />
      </Sider>

      {/* Main Layout */}
      <Layout
        style={{
          marginLeft: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
        }}
      >
        {/* Fixed Header */}
        <Header
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            left: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
            height: HEADER_HEIGHT,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 24px",
            zIndex: 100,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />

          <Space>
            <ThemeToggle />
            <Button type="primary" onClick={handleLogout}>
              Logout
            </Button>
          </Space>
        </Header>

        {/* Scrollable Content */}
        <Content
          style={{
            marginTop: HEADER_HEIGHT,
            padding: 24,
            minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
