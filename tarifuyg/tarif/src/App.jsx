import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { Link } from 'react-router-dom';
import logo from "./assets/logo.png";
function App() {
  const [search, setSearch] = useState("");
  const [meals, setMeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (search.trim() === "") {
      setMeals([]);
      return;
    }

    const fetchMeals = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
        );
        const data = await response.json();

        if (data.meals) {
          const filteredMeals = data.meals.filter((meal) =>
            meal.strMeal.toLowerCase().startsWith(search.toLowerCase())
          );
          setMeals(filteredMeals);
        } else {
          setMeals([]);
        }
      } catch (error) {
        console.error("Hata:", error);
      }
    };

    fetchMeals();
  }, [search]);

  const handleSearch = () => {
    if (meals.length > 0) {
      navigate("/Recipe", { state: { total: meals } });
    } else {
      alert("Bulunamadı.");
    }
  };

  const newMeal=(meal)=>{
    setSearch(meal.strMeal)

  }

  return (
    <div>
      <div className="page">
        
        <div className="menu">
        <div className="logo">
        <img src={logo} alt="Logo"  style={{
    position: "absolute", 
    top: "0", 
    left: "0", 
    padding: "10px",
    width: "150px", 
    height: "auto",
  }}  />          </div>
          <div className="dropdown">
            <button style={{  marginLeft: "50px"}} className="dropbtn">
              Tarifler
            </button>
            <div style={{  marginLeft: "50px"}} className="dropdown-content">
            <Link to="Allrecipe">Tüm Tarifler</Link>
            <Link to="/Favorites">Favoriler</Link>
            <Link to="/WriteRecipe">Tarif Yaz</Link>
            </div>
          </div>

          <div className="dropdown">
            <button className="dropbtn">Hakkımızda</button>
            <div className="dropdown-content">
            <Link to="/What">Nedir ?</Link>
            <Link to="/Contact">İletişim</Link>
            </div>
          </div>

          <div className="sign">
            <button className="sign-in" onClick={() => navigate("/SignIn")}>
              GİRİŞ
            </button>
            <button className="sign-up" onClick={() => navigate("/SignUp")}>
              KAYIT
            </button>
          </div>

          <div className="main">
            <h1> Yemek </h1>
            <h1> Tarifleri </h1>
            <h1> Bul! </h1>
            <p>Kolayca tarif arayıp bulabilirsin.</p>
          </div>
        </div>

        <div className="search">
          <div className="searchinput">
            <input
              className="input"
              placeholder="Bir tarif arayın"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            
          </div>
          <button onClick={handleSearch}>ARA</button>
        </div>
        {meals.length > 0 ? (
              <div className="results">
               <ul>
              {meals.map((meal) => (
                <li key={meal.idMeal} onClick={() => newMeal(meal)}>
                  {meal.strMeal}
                </li>
              ))}
            </ul>

              </div>
            ) : (
              search.length > 0 && (
                <div className="">
                  <p></p>
                </div>
              )
            )}
      </div>
    </div>
  );
}

export default App;
