import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./recipe.css";

const Recipe = () => {
  const location = useLocation();
  const state = location.state;

  const [expanded, setExpanded] = useState(null); 
  const toggleLearnMore = (id) => {
    setExpanded((prev) => (prev === id ? null : id));  //sadece tek kart açık kalsın
  };


  const getIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(meal[`strIngredient${i}`]);
      }
    }
    return ingredients;
  };


  return (
    <div className="recipePage">
      <div className={`cardContainer ${expanded !== null ? "shiftAll" : ""}`}>
        {state.total.map((meal, i) => (
          <Card
            key={i}
            className={`recipeCard ${expanded === i ? "active" : ""}`}
          >
            <CardMedia
              component="img"
              alt={meal.strMeal}
              height="150"
              image={meal.strMealThumb}
            />
            <CardContent>
              <Typography gutterBottom variant="h5">
                {meal.strMeal}
              </Typography>
              <Typography variant="body2" className="ingredientList">
                Malzemeler:
                <ul>
                  {getIngredients(meal).map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ul>
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => toggleLearnMore(i)}>
                {expanded === i ? "Daha Az" : "Daha Fazla"}
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>

      {expanded !== null && (
        <div className="detailBox show">
          <Typography variant="h6">{state.total[expanded].strMeal}</Typography>
          <Typography variant="body2" className="instructions">
            {state.total[expanded].strInstructions}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Recipe;