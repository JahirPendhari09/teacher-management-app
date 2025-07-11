import { createContext, useState } from "react";
import type { ThemeContextType, ThemeProviderProps } from "../types";

export const ThemeContext = createContext<ThemeContextType>({
  isSideBarVisible: false,
  setIsSideBarVisible: () => {},
});

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isSideBarVisible, setIsSideBarVisible] = useState<boolean>(false);

  return (
    <ThemeContext.Provider value={{ isSideBarVisible, setIsSideBarVisible }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
