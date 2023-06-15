import { createContext, useContext, useLayoutEffect, useState } from "react";
import { ThemeTypes, IThemeContext } from "../types/theme";
import { Theme, ThemeProvider, createTheme } from "@mui/material";

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);
export const useTheme = () => useContext(ThemeContext);

const lightTheme = createTheme({
    palette: {
        mode: "light",
        background: {
            default: "white"
        }
    },
});

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#30343c"
        }
    }
});

const isDarkTheme: boolean = window?.matchMedia("(prefers-color-scheme: dark)").matches;
const defaultTheme = isDarkTheme ? ThemeTypes.DARK : ThemeTypes.LIGHT;

const getThemeByType = (type: ThemeTypes): Theme => {
    return type === ThemeTypes.LIGHT ? lightTheme : darkTheme;
}

export default function CustomThemeProvider(
    { children }: { children: React.ReactNode; }) 
{
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

    const providerValue: IThemeContext = {
        theme,
        setTheme,
        toggleTheme
    };

    return (
        <ThemeProvider theme={theme === ThemeTypes.DARK ? darkTheme : lightTheme}>
            <ThemeContext.Provider value={providerValue}>
                {children}
            </ThemeContext.Provider>
        </ThemeProvider>
    );
}
