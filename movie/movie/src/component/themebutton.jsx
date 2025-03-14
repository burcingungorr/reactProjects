import React, { useContext } from "react";
import { SunMoon } from "lucide-react";
import { ThemeContext } from "./createcontext";

const ThemeButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
      }}
    >
      <SunMoon size={25} color={theme === "light" ? "black" : "white"} />
    </button>
  );
};

export default ThemeButton;
