import { Layout } from "antd";
import { Outlet } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const AppContent = ({ HEADER_HEIGHT }) => {
  return (
    <div>
      <Content
        style={{
          marginTop: HEADER_HEIGHT,
          padding: 24,
          height:"89vh",
          // minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
          overflow: "auto",
        }}
      >
        <Outlet />
      </Content>
    </div>
  );
};

export default AppContent;
