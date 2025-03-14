import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Allrecipe.css";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Allrecipe = () => {
  const [recipes, setRecipes] = useState([]); 
  const [favorites, setFavorites] = useState([]); 
  const [filteredRecipes, setFilteredRecipes] = useState([]); 
  const [categories, setCategories] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const [showUserRecipes, setShowUserRecipes] = useState(false); 
  const [userRecipes, setUserRecipes] = useState([]); 
  const [newUser, setNewUser] = useState(null); 

  const navigate = useNavigate();

  const fetchRecipes = async () => {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
    const data = await response.json();
    setRecipes(data.meals);
    setFilteredRecipes(data.meals);
  };

  const fetchCategories = async () => {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    const data = await response.json();
    setCategories(data.categories);
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    fetchRecipes();
    fetchCategories();
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);

    const loggedInUser = JSON.parse(localStorage.getItem("newUser"));

    if (loggedInUser) {
      setNewUser(loggedInUser);
      const savedRecipes = JSON.parse(localStorage.getItem("userRecipes")) || [];
      setUserRecipes(savedRecipes);
    }
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const fetchByCategory = async () => {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`);
        const data = await response.json();
        setFilteredRecipes(data.meals);
      };
      fetchByCategory();
    } else {
      setFilteredRecipes(recipes);
    }
  }, [selectedCategory, recipes]);

  
  const toggleFavorite = (meal) => {
    if (favorites.includes(meal.idMeal)) {
      setFavorites(favorites.filter((id) => id !== meal.idMeal));
    } else {
      setFavorites([...favorites, meal.idMeal]);
    }
  };

  const handleUserRecipesToggle = () => {
    if (newUser) {
      setShowUserRecipes(!showUserRecipes);
    } else {
      alert("Önce giriş yapmalısın!");
    }
  };

  
  return (
    <div className="body2">
      <h1 className="allrecipes">Tüm Tarifler</h1>

      <div style={{ display: "flex", alignItems: "center", gap: "15px", marginLeft: "9.5%", width: "500px" }}>
        <select className="categorySelect" onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Kategoriler</option>
          {categories.map((category, i) => (
            <option key={i} value={category.strCategory}>
              {category.strCategory}
            </option>
          ))}
        </select>

        <div className="checkbox" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <input
            type="checkbox"
            checked={showUserRecipes}
            onChange={handleUserRecipesToggle}
          />
          <p style={{ fontSize: "15px", margin: "0" }}>Tariflerim</p>
        </div>
      </div>

      <div className="ui cards">
        {showUserRecipes ? (
          userRecipes.length > 0 ? (
            userRecipes.map((item, i) => (
              <div key={i} className="ui card user-recipe-card" style={{ marginBottom: "20px", width: "400px" }}>
                {item.image && (
                  <div className="image">
                    <img src={item.image} alt={item.title} />
                  </div>
                )}
                <div className="content" style={{ display: "flex", flexDirection: "column" }}>
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                  <p>{newUser?.email}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Henüz kendi tarifiniz yok.</p>
          )
        ) : (
          filteredRecipes &&
          filteredRecipes.map((meal, i) => (
            <div key={i} className="ui card" style={{ marginBottom: "20px" }}>
              <div className="image">
                <img src={meal.strMealThumb} alt={meal.strMeal} />
              </div>
              <div className="content">
                <a style={{ color: "black" }}>{meal.strMeal}</a>
                <div className="hearticon" onClick={() => toggleFavorite(meal)}>
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{
                      fontSize: "25px",
                      color: favorites.includes(meal.idMeal) ? "red" : "gray",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Allrecipe;
