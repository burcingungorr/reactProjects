import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import "./index.css";

const Menu = () => {
  const navigate = useNavigate(); 

  return (
    <div>
      <div className="ui three item menu">
        <a className="item" onClick={() => navigate('/Categories')}>Kategoriler</a>
        <a className="item" onClick={() => navigate('/')} >Anasayfa</a> 
        <a className="item" onClick={() => navigate('/Profil')}>Profil</a> 
      </div>
    </div>
  );
};

export default Menu;
