import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Recipe from "./Recipe.jsx";
import SignIn from './signin.jsx'; 
import SignUp from './signup.jsx';
import Allrecipe from './Allrecipe.jsx';
import Contact from './Contact.jsx';
import What from './What.jsx';
import Favorites from './Favorites.jsx';
import WriteRecipe from './WriteRecipe.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Recipe" element={<Recipe />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/Allrecipe" element={<Allrecipe />} /> 
      <Route path="/Contact" element={<Contact />} />
      <Route path="/What" element={<What />} />
      <Route path="/Favorites" element={<Favorites />} />
      <Route path="/WriteRecipe" element={<WriteRecipe />} />
    </Routes>
  </BrowserRouter>
);
