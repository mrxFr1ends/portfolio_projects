import useTheme from "../../hooks/useTheme";
import { MoonIcon, SunIcon } from "../../icons/Icons";
import Button from "../generic/Button/old_index";
import "./SwapTheme.css";

const SwapTheme = () => {
    const { theme, setTheme } = useTheme();
    return (
        <Button
            className="swap_theme"
            onClick={_ => setTheme(theme == "light" ? "dark" : "light")}
        >
            {theme == "dark" ? (
                <SunIcon className="swap_theme__icon" />
            ) : (
                <MoonIcon className="swap_theme__icon" />
            )}
        </Button>
    );
};

export default SwapTheme;
