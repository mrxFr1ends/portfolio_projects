export enum ThemeTypes {
    LIGHT = "light",
    DARK = "dark"
}

export interface IThemeContext {
    theme: ThemeTypes;
    setTheme: (theme: ThemeTypes) => void;
    toggleTheme: () => void;
}