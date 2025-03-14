import { useState, useEffect } from "react";
import { ThemeContext } from "./createcontext";

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light"); 

  useEffect(() => {
    document.body.style.backgroundColor = theme === "light" ? "#ffffff" : "#000000";
    document.body.style.color = theme === "light" ? "#000000" : "#ffffff";
  
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
