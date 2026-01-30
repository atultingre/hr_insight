import React, { createContext, useContext, useState } from "react";
import { ConfigProvider } from "antd";
import { lightTheme, darkTheme } from "./antdTheme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ConfigProvider theme={mode === "dark" ? darkTheme : lightTheme}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
