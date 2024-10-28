import React, { createContext, useContext, useState } from "react";
import { ThemeProvider } from "styled-components";

import GLOBAL_COLOR_TOKEN from "../infrastructure/color/color.token";

const lightTheme = {
  background: GLOBAL_COLOR_TOKEN.white,
  color: GLOBAL_COLOR_TOKEN.black,
};

const darkTheme = {
  background: GLOBAL_COLOR_TOKEN.black,
  color: GLOBAL_COLOR_TOKEN.white,
};

const ThemeContext = createContext<unknown>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  return useContext(ThemeContext);
};

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
