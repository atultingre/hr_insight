import React, { createContext, useContext, useEffect, useState } from "react";
import { ConfigProvider } from "antd";
import { lightTheme, darkTheme } from "./antdTheme";

const ThemeContext = createContext();

const THEME_KEY = "app-theme"; // localStorage key

export const ThemeProvider = ({ children }) => {
  // 1️⃣ Load theme from localStorage (fallback to light)
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("app-theme") || "light";
  });

  // 2️⃣ Save theme to localStorage on change
  useEffect(() => {
    localStorage.setItem(THEME_KEY, mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ConfigProvider theme={mode === "dark" ? darkTheme : lightTheme}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
