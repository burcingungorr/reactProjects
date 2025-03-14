import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { auth, firestore } from '../config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { onAuthStateChanged } from "firebase/auth";

const Sign = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate=useNavigate();



const handleSignup = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: name,
    });
    await setDoc(doc(firestore, 'users', user.uid), {
      name,
      email
    });

    alert("Kayıt başarılı");
  } catch (error) {
    console.error("Kayıt Hatası:", error.code, error.message);
  }
};

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Giriş başarılı");
      navigate('/')
    } catch (error) {
      console.error("Giriş Hatası:", error.code, error.message);
    }
  };

  const [user, setUser] = useState(null); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); 
        console.log(currentUser, "currentUser");

      } else {
        setUser(null); 
      }
    });

    return () => unsubscribe();
 
  }, []);


  return (
    <div>  
 {user ? ( 
          <h2 style={{color:"white",textAlign:"center"}}>Zaten Giriş Yaptınız!</h2> 
        ) : ( 
          <div className="auth-bg">
          <div className="auth-container">
            {/* Arka Kısım */}
            <div className="auth-back">
      <div className={`msg-box ${!isSignup ? 'visible' : 'hidden'}`}>
        <p className="msg-title">Hesabın yok mu?</p>
        <p>Profil oluşturmak için kayıt olun.</p>
        <button onClick={() => setIsSignup(true)} className="btn">Kayıt Ol</button>
      </div>
    
      <div className={`msg-box ${isSignup ? 'visible' : 'hidden'}`}>
        <p className="msg-title">Hesabın var mı?</p>
        <p>Profilinizi görmek için giriş yapın.</p>
        <button onClick={() => setIsSignup(false)} className="btn">Giriş Yap</button>
      </div>
    </div>
    
    
            {/* Ön Kısım */}
            <motion.div
              animate={{ right: isSignup ? '45%' : '3%' }}
              transition={{ duration: 0.8 }}
              className="auth-front"
            >
              {!isSignup ? (
                <div className="form-box">
                  <h2 className="form-title">GİRİŞ</h2>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="E-Posta"
                      className="inputsign"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="Parola"
                      className="inputsign"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <p className="forgot">Şifreni mi unuttun?</p>
                  <button className="submit-btn" onClick={handleLogin}>GİRİŞ</button>
                </div>
              ) : (
                <div className="form-box">
                  <h2 className="form-title">KAYIT</h2>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="İsim"
                      className="inputsign"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="E-Posta"
                      className="inputsign"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="Parola"
                      className="inputsign"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button className="submit-btn" onClick={handleSignup}>KAYIT</button>
                </div>
              )}
            </motion.div>
          </div>
        </div>        )}


    </div>
   
  );
};

export default Sign;
