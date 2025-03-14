import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Kelimelik } from "./pages/Kelimelik.jsx";
import Liderlik from "./pages/Liderlik.jsx";
import Hakkımızda from "./pages/Hakkımızda.jsx";
import Profil from "./pages/Profil.jsx";
import { UserProvider } from "./component/UserProvider"; 

createRoot(document.getElementById("root")).render(
  <UserProvider> 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Kelimelik" element={<Kelimelik />} />
        <Route path="/Liderlik" element={<Liderlik />} />
        <Route path="/Profil" element={<Profil />} />
        <Route path="/Hakkımızda" element={<Hakkımızda />} />
      </Routes>
    </BrowserRouter>
  </UserProvider>
);
