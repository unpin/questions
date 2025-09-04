import { ThemeContext } from "@/providers/theme/ThemeContext";
import { useContext } from "react";

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
}
