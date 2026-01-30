import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";

const { Header } = Layout;
const AppHeader = ({ collapsed, onToggle, onMobileMenu, isMobile }) => {
  return (
    <Header
      style={{
        position: "fixed",
        right: 0,
        height: 64,
        background: "#fcfafa",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        width: collapsed ? "calc(100% - 80px)" : "calc(100% - 220px)",
      }}
    >
      <div
        style={{
          display: "flex",
          float: "right",
          alignItems: "center",
          justifyContent: "space-between",
          width: !isMobile ? "100%" : "200px",
        }}
      >
        {!isMobile && (
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={onToggle}
            style={{ width: 64, height: 64 }}
          />
        )}
        <Button variant="filled" color="red">
          Logout
        </Button>

        {isMobile && (
          <Button
            type="text"
            onClick={onMobileMenu}
            style={{ width: 64, height: 64 }}
          >
            ☰
          </Button>
        )}
      </div>
    </Header>
  );
};

export default AppHeader;
