import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* FIXED SIDEBAR */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={220}
        style={{
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          background: "#fff",
          zIndex: 100,
          // background: "#da1f26",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          transition: "0.2s",
        }}
      >
        <div style={{ padding: "16px", textAlign: "center" }}>
          <img
            src="https://tdimg.techdogs.com/assets/techdogs-light.webp"
            alt="Logo"
            style={{
              width: collapsed ? "40px" : "140px",
              transition: "0.3s",
            }}
          />
        </div>

        <Menu
          // mode="inline"
          theme="light"
          defaultSelectedKeys={["1"]}
          style={{ background: "#fef9f9", color: "#000", border: "none" , marginTop: "16px"}}
          items={[
            { key: "1", icon: <UserOutlined />, label: "Questions" },
            { key: "2", icon: <VideoCameraOutlined />, label: "Employees" },
            { key: "3", icon: <UploadOutlined />, label: "Submissions" },
            { key: "4", icon: <UploadOutlined />, label: "HR Access" },
            { key: "5", icon: <UploadOutlined />, label: "Reports" },
          ]}
        />
      </Sider>

      {/* MAIN LAYOUT */}
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 220,
          transition: "0.2s",
        }}
      >
        {/* FIXED HEADER */}
        <Header
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            left: collapsed ? 80 : 220,
            height: 64,
            padding: 0,
            background: "#fff",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            transition: "0.2s",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: 16,
              width: 64,
              height: 64,
            }}
          />
        </Header>

        {/* SCROLLABLE CONTENT */}
        <Content
          style={{
            marginTop: 64,
            padding: 24,
            height: "calc(100vh - 64px)",
            overflowY: "auto",
            background: "#f5f5f5",
          }}
        >
          <div
            style={{
              padding: 24,
              background: "#fff",
              minHeight: "200vh", // demo scroll
              borderRadius: 8,
            }}
          >
            Content goes here 🚀
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
