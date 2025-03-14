import React from 'react';
import "./other.css"; 
import what from "./assets/what.webp";
import "./index.css"
import { Link } from 'react-router-dom';

const What = () => {
  return (
    <div> 
    <div className="menu" style={{ position: "absolute", top: "0", left: "0",display: "flex", flexDirection: "row", alignItems: "flex-start", padding: "10px" }}>

    <div className="dropdown" style={{ margin: "0 0 0 0" }}>
      <button style={{ margin: "0" }} className="dropbtn">
        Tarifler
      </button>
      <div style={{ margin: "0" }} className="dropdown-content">
        <Link to="Allrecipe">Tüm Tarifler</Link>
        <Link to="/Favorites">Favoriler</Link>
        <Link to="/WriteRecipe">Tarif Yaz</Link>
      </div>
    </div>
    
    <div className="dropdown" style={{ margin: "0 0 0 0" }}>
      <button style={{ margin: "0" }} className="dropbtn">Hakkımızda</button>
      <div className="dropdown-content">
        <Link to="/What">Nedir ?</Link>
        <Link to="/Contact">İletişim</Link>
      </div>
    </div>
    
    </div>
    
    <div className="containerwhat">
      <h1 className="title">Nedir?</h1>
      <div className="content">
        <div className="text-section">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <div className="image-section">
          <img src={what} alt="What illustration" />
        </div>
      </div>
    </div></div>
  );
}
export default What;
