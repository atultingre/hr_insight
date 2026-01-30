import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import ThemeToggle from "../theme/ThemeToggle";
import { Header } from "antd/es/layout/layout";

const AppHeader = ({
  collapsed,
  setCollapsed,
  handleLogout,
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_WIDTH,
  HEADER_HEIGHT,
}) => {
  return (
    <>
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
    </>
  );
};

export default AppHeader;
