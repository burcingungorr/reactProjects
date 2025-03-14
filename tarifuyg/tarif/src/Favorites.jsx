import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Allrecipe.css"; 

const Favorites = () => {
  const [favoriteMeals, setFavoriteMeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];


    const fetchFavorites = async () => {
      const fetchedMeals = [];
      for (let mealId of savedFavorites) {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await response.json();
        if (data.meals) {
          fetchedMeals.push(data.meals[0]);
        }
      }
      setFavoriteMeals(fetchedMeals);
    };

    fetchFavorites();
  }, []);



  const removeFavorite = (mealId) => {
    const updatedFavorites = favoriteMeals.filter((meal) => meal.idMeal !== mealId);
    setFavoriteMeals(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites.map((meal) => meal.idMeal)));
  };

  return (
    <div className="body2">
      <h1 className="allrecipes">Favori Tarifler</h1>

      {favoriteMeals.length > 0 ? (
        <div className="ui cards">
          {favoriteMeals.map((meal) => (
            <div key={meal.idMeal} className="ui card" style={{ marginBottom: "20px" }}>
              <div className="image">
                <img src={meal.strMealThumb} alt={meal.strMeal} />
              </div>
              <div className="content">
                <a onClick={() => mealRecipe(meal)} style={{ cursor: "pointer", color: "black" }}>
                  {meal.strMeal}
                </a>
                <div className="hearticon" onClick={() => removeFavorite(meal.idMeal)}>
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{
                      fontSize: "25px",
                      color: "red", 
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{marginLeft:"30px"}} >Henüz favori tarif eklenmedi.</p>
      )}
    </div>
  );
};

export default Favorites;
