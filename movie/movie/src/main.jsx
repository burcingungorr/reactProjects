import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import Categories from "./pages/Categories.jsx";
import Profil from "./pages/Profil.jsx";
import Sign from "./pages/Sign.jsx";
import ThemeProvider from "./component/contextprovider"; 
import ThemeButton from "./component/themebutton"; 

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <BrowserRouter>
      <ThemeButton />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Anasayfa" element={<App />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/Profil" element={<Profil />} />
        <Route path="/Sign" element={<Sign />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);
