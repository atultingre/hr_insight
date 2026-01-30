import { theme } from "antd";

const BRAND_COLOR = "#da1f26";

export const lightTheme = {
  token: {
    colorPrimary: BRAND_COLOR,
    borderRadius: 8,
  },
  components: {
    Layout: {
      siderBg: BRAND_COLOR,
      headerBg: "#ffffff",
    },
    Menu: {
      itemSelectedBg: BRAND_COLOR,
      itemSelectedColor: "#ffffff",
    },
  },
};

export const darkTheme = {
  token: {
    colorPrimary: BRAND_COLOR,
    borderRadius: 8,
  },
  algorithm: theme.darkAlgorithm,
  components: {
    Layout: {
      siderBg: "#141414",
      headerBg: "#1f1f1f",
    },
  },
};
