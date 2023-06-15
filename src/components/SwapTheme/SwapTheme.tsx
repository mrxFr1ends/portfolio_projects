import { Button } from "@mui/material";
import { useTheme } from "../../providers/CustomThemeProvider";
import { ThemeTypes } from "../../types/theme";
import { LightMode, Brightness3} from "@mui/icons-material"
import "./SwapTheme.css";

const SwapTheme = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <Button
            className="swap_theme"
            onClick={(_: any) => toggleTheme()}
            title={`Поменять тему на ${(theme === ThemeTypes.LIGHT ? "темную" : "светлую")}`}
            variant="outlined"
        >
            {theme === ThemeTypes.DARK ? (
                <LightMode className="swap_theme__icon" sx={{transform: "scale(2)"}}/>
            ) : (
                <Brightness3
                sx={{transform: "rotate(45deg) scale(2)", margin: "3px 0 0 3px"}} className="swap_theme__icon" />
            )}
        </Button>
    );
};

export default SwapTheme;
