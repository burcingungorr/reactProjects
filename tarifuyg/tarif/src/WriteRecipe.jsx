import React, { useState } from "react";

export default function WriteRecipe() {

  const [recipe, setRecipe] = useState("");
  const [recipeTitle, setRecipeTitle] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [image, setImage] = useState(null); 
  const [imagePreview, setImagePreview] = useState(null); 

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); //resim yükleme ve önizleme
    }
  };


  const handleSubmit = () => {
    
    const newUser = JSON.parse(localStorage.getItem("newUser"));

    if (newUser && newUser.password !== "" && newUser.email !== ""){

    if (recipe.trim() === "" || recipeTitle.trim() === "") {
      alert("Lütfen tarifinizi yazın!");
    } else {
      const newRecipe = {
        title: recipeTitle,
        content: recipe,
        image: imagePreview, 
      };
      const updatedRecipes = [...recipes, newRecipe];
      setRecipes(updatedRecipes);
      localStorage.setItem("userRecipes", JSON.stringify(updatedRecipes)); // localstorage kaydet


      setRecipe("");
      setRecipeTitle("");
      setImage(null);
      setImagePreview(null);
      alert("Tarifiniz kaydedildi!");
    }
  }else{
      alert("Önce giriş yapmalısın!");
    }
  };


    




  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80px" }}>
        <h1>Tarif Yaz</h1>
      </div>

      <main>
        <section id="story-section">

          <textarea
            id="title-box"
            placeholder="Tarifinizin adını yazın"
            value={recipeTitle}
            onChange={(e) => setRecipeTitle(e.target.value)}
          />

          <textarea
            id="story-box"
            placeholder="Tarifinizi yazın"
            value={recipe}
            onChange={(e) => setRecipe(e.target.value)}
          />

          <input type="file" accept="image/*" onChange={handleImageUpload} />

          {imagePreview && (
            <div style={{ marginTop: "10px" }}>
              <h3>Yüklenen Resim:</h3>
              <img src={imagePreview} alt="Yüklenen Resim" style={{ width: "200px", height: "auto", borderRadius: "8px" }} />
            </div>
          )}

          <button id="submit-btn" onClick={handleSubmit}>
            Gönder
          </button>
        </section>
      </main>
    </div>
  );
}
