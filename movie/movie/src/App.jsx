import { useContext, useEffect, useState } from 'react';
import './App.css';
import Search from './component/search';
import Menu from './component/menu';
import Card from './component/Card';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import { auth } from './config';
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { ThemeContext } from "./component/createcontext";



function App() {
  const navigate = useNavigate(); 
  const [user, setUser] = useState(null);
    const { theme } = useContext(ThemeContext);
  
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/"); 
        alert("Başarıyla çıkış yapıldı");
      })
      .catch((error) => {
        console.error("Çıkış hatası:", error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); 
        console.log(currentUser, "currentUser");
  
      } else {
        setUser(null); 
      }
    });
  
  
  }, []);
  return (
    <>
      <div>
        <div>
          <h1 style={{ color: theme === "light" ? "black" : "white", textAlign: 'center' }}>MOVIE</h1>
          <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', alignItems: 'center', gap: '10px' }}>
  <div style={{ color: theme === "light" ? "black" : "white", position: "relative", display: 'flex', alignItems: 'center' }}>
    {user ? (
      <p style={{ margin: 0 ,color: theme === "light" ? "black" : "white"}}>{user.displayName}</p>
    ) : (
      <p style={{ margin: 0,color: theme === "light" ? "black" : "white" }}>Giriş Yap</p>
    )}
  </div>
  <User
    size={30}
    fill="white"
    color={theme === "light" ? "black" : "white"}    
    style={{ cursor: 'pointer' }}
    onClick={() => navigate('/Sign')}
  />
  <LogOut
    size={30}
    fill="white"
    color={theme === "light" ? "black" : "white"}
    style={{ cursor: 'pointer' }}
    onClick={handleLogout}
  />
</div>

        </div>

        <div><Menu /></div>

        <div className='search' style={{border:"none"}} ><Search /></div>

        <div>
          <h4
            style={{
              color: 'white',
              textAlign: 'center',
              marginTop: "50px",
            }}
          >
            EN SEVİLENLER
          </h4>
        </div>

        <div><Card /></div>

        <footer  style={{ margin: 0,color: theme === "light" ? "black" : "white" }}>
          <div className='footer1' >
            <p>Kategoriler</p>
            <p>Profil</p>
            <p>İletişim</p>
          </div>
          <div className="vr"></div>
          <div className='footer2'>
            <p>E-Posta: movie@gmail.com</p>
            <p>Telefon: 0xxx xxx </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
