import { Switch } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useTheme } from "../theme/ThemeContext";

export default function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();

  return (
    <Switch
      checked={mode === "dark"}
      onChange={toggleTheme}
      checkedChildren={<MoonOutlined />}
      unCheckedChildren={<SunOutlined />}
    />
  );
}
