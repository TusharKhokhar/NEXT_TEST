import { createContext, Dispatch, SetStateAction } from "react";
import theme from "../../intelli-kam-config/theme";

const setTheme: Dispatch<SetStateAction<typeof theme>> = () => theme;

const ThemeContext = createContext({ theme, setTheme });

export default ThemeContext;
