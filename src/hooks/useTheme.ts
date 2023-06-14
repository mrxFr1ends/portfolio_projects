import { useState, useLayoutEffect } from "react";
import { ThemeTypes } from "../types/theme";

const isDarkTheme: boolean = window?.matchMedia("(prefers-color-scheme: dark)").matches;
const defaultTheme = isDarkTheme ? ThemeTypes.DARK : ThemeTypes.LIGHT;

const useTheme = () => {
  const [theme, setTheme] = useState<ThemeTypes>(
    localStorage.getItem("app-theme") as ThemeTypes || defaultTheme
  );

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("app-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === ThemeTypes.DARK ? ThemeTypes.LIGHT : ThemeTypes.DARK);
  };

  return { theme, toggleTheme };
};

export default useTheme;
