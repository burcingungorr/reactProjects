import "./Questionsscreen.css"; 
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {Menu} from "lucide-react";

const Header = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar navbar-mainbg">
      <div className="container">
        <Link 
          className={`navbar-logo ${activeTab === "/" ? "active-home" : ""}`} 
          to="/" 
          onClick={() => setActiveTab("/")}>
          Anasayfa
        </Link>

        <div className={`hamburger-menu ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
        <Menu 
        size={40}
        />
        </div>
        

        <ul className={`navbar-nav ${menuOpen ? "open" : ""}`}>
          {[
            { path: "/kelimelik", name: "Kelimelik" },
            { path: "/liderlik", name: "Liderlik" },
            { path: "/profil", name: "Profil" },
            { path: "/hakkımızda", name: "Hakkımızda" },
          ].map((item) => (
            <li
              key={item.path}
              className={`nav-item ${activeTab === item.path ? "active" : ""}`}
              onClick={() => setActiveTab(item.path)}
            >
              <Link className="nav-link" to={item.path}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
