import { ReactNode, Dispatch, SetStateAction } from "react";

export interface ThemeContextType {
  isSideBarVisible: boolean;
  setIsSideBarVisible: Dispatch<SetStateAction<boolean>>;
}

export interface ThemeProviderProps {
  children: ReactNode;
}