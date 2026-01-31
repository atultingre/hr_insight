// ========================
// src/pages/Login.jsx
// ========================
import { Alert, Button, Card, Divider, Input, Space, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext";

const { Title, Text } = Typography;
const BRAND_COLOR = "#da1f26";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    try {
      const user = login(email, password);
      navigate(`/${user.role.replace("_", "-")}`);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        // margin:"auto auto",
        // width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8f8f8 !important",
      }}
    >
      <Card
        style={{
          width: 400,
          borderTop: `4px solid ${BRAND_COLOR}`,
          background: "#f8f8f8 !important",
        }}
      >
        <Title level={3} style={{ textAlign: "center", color: BRAND_COLOR }}>
          Login
        </Title>

        <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input.Password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <Alert type="error" message={error} showIcon />}

          <Button type="primary" block size="large" onClick={handleLogin}>
            Login
          </Button>

          <Divider />

          <Text strong>Dummy Users</Text>
          <ul style={{ paddingLeft: 18, margin: 0 }}>
            <li>employee@company.com / employee123</li>
            <li>admin@company.com / admin123</li>
            <li>viewer@company.com / viewer123</li>
          </ul>
        </Space>
      </Card>
    </div>
  );
}
