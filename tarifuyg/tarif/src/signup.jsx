import React, { useState } from "react";
import "./signin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate=useNavigate();
  const [user,setUser]=useState();
  const [password,setPassword]=useState();
  const [email,setEmail]=useState();


  const signup = () => {
    if (email.trim() === "" || password.trim() === "") {
      alert("Lütfen bilgilerinizi yazın!");
    } else {
      const newUser = {
        email: email,
        password: password,
      };
      setUser(newUser);
      localStorage.setItem("newUser", JSON.stringify(newUser)); // localstorage kaydet


      setPassword("");
      setEmail("");
      alert("Kayıt başarıyla yapıldı!");
      navigate("/SignIn")
    }
  };

  return (
    <div>
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <form action="#">
            <FontAwesomeIcon 
              icon={faUtensils} 
              style={{ color: "#0d730d", fontSize: "50px",marginBottom:15 }} 
            />
            <h1 className="h1">Hesap Oluştur</h1>
            <input
              type="email"
              placeholder="E-posta"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input
              type="password"
              placeholder="Parola"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
            <button className="buttonsign" onClick={signup}>Kayıt</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h2>Yeniden Hoşgeldin!</h2>
              <p>Zaten hesabınız varsa lütfen giriş yapın.</p>
              <button className="ghost" id="signUp" onClick={()=>navigate('/SignIn')}>
                Giriş
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
