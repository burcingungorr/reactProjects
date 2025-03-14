import React, { useState } from "react";
import "./signin.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


const SignIn = () => {
    const navigate=useNavigate();
	const [email,setEmail]=useState();
	const [password,setPassword]=useState();



	const login=()=>{

	const newUser = JSON.parse(localStorage.getItem("newUser"));

		if(newUser && newUser.email==email && newUser.password==password){
			alert("Giriş Başarılı!")
			navigate("/")
		}
	}
	

  return (
    <div>
<div class="container" id="container">
	
	<div className="form-container sign-in-container">
		<form action="#">
       <FontAwesomeIcon 
                    icon={faUtensils} 
                    style={{ color: "#ed9900", fontSize: "50px",marginBottom:15 }} 
                  />
			<h1 className="h1">Giriş Yap</h1>
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
			<a href="#">Şifreni mi unuttun?</a>
			<button onClick={login}>Giriş</button>
		</form>
	</div>
	<div className="overlay-container">
		<div className="overlay" >
			<div className="overlay-panel overlay-right"  style={{backgroundColor:"#ed9900"}}>
				<h2>Hoşgeldin!</h2>
				<p>Hesabınız yoksa lütfen kayıt olun.</p>
				<button className="ghost" id="signUp" onClick={()=>navigate('/SignUp')}>Kayıt Ol</button>
			</div>
		</div>
	</div>
</div>
    </div>
  )
}

export default SignIn