import useTheme from "../../hooks/useTheme";
import { MoonIcon, SunIcon } from "../../icons/Icons";
import { ThemeTypes } from "../../types/theme";
import Button from "../generic/Button";
import "./SwapTheme.css";

const SwapTheme = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <Button
            className="swap_theme"
            onClick={(_: any) => toggleTheme()}
            title={`Поменять тему на ${(theme === ThemeTypes.LIGHT ? "темную" : "светлую")}`}
        >
            {theme == ThemeTypes.DARK ? (
                <SunIcon className="swap_theme__icon" />
            ) : (
                <MoonIcon className="swap_theme__icon" />
            )}
        </Button>
    );
};

export default SwapTheme;
