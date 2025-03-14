import React, { useEffect, useState, useContext } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from '../config';
import { collection, onSnapshot } from "firebase/firestore";
import { CircleUserRound, Clock, Heart, SquareCheck ,SunMoon } from 'lucide-react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'; 
import { styled } from '@mui/material/styles'; 
import Menu from '../component/menu';
import Themebutton from '../component/themebutton';
import { ThemeContext } from "../component/createcontext";

const Profil = () => {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]); 
  const [checked, setChecked] = useState({});
  const [favorite, setFavorite] = useState({});
  const [watchLater, setWatchLater] = useState({});
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log(currentUser, "currentUser");

        const userId = currentUser.uid;
        const moviesRef = collection(firestore, `users/${userId}/movies`);

        onSnapshot(moviesRef, (snapshot) => {
          const checkedData = {};
          const favoriteData = {};
          const watchLaterData = {};
          const moviesList = [];

          snapshot.forEach((doc) => {
            const data = doc.data();
            moviesList.push({ id: doc.id, ...data });

            if (data.checked) checkedData[doc.id] = data.checked;
            if (data.favorite) favoriteData[doc.id] = data.favorite;
            if (data.watchLater) watchLaterData[doc.id] = data.watchLater;
          });

          setMovies(moviesList);
          setChecked({ ...checkedData });
          setFavorite({ ...favoriteData });
          setWatchLater({ ...watchLaterData });
        });

      } else {
        setUser(null);
        setMovies([]);
      }
    });

  }, []);

  const Item = styled(Paper)(({ }) => ({
    backgroundColor: '#8B0000',
    color: 'white',
    padding: '20px',
    textAlign: 'center',
    marginTop: '10px',
    boxShadow: '0px 2px 10px rgba(0,0,0,0.2)',
  }));

  
  
  return (

    <div style={{marginTop:"79px"}}
    >
<Menu />



      <div 
        className="profil" 
        style={{ color: theme === "light" ? "black" : "white", textAlign: "center", marginTop: "50px" }}
      >
        <CircleUserRound color={theme === "light" ? "black" : "white"} size={100} />
        
        {user ? ( 
          <h2 style={{ color: theme === "light" ? "black" : "white" }}>
            Merhaba {user.displayName || user.email}!
          </h2> 
        ) : ( 
          <h2 style={{ color: theme === "light" ? "black" : "white" }}>
            Lütfen giriş yapınız.
          </h2>
        )}
      </div>

      <Grid container rowSpacing={2} sx={{ textAlign: 'center', minHeight: '100vh', justifyContent: 'center' }}>
                <Grid item xs={7}>
          <Item>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              Favoriler
              <Heart color="white" size={20} />
            </div>
          </Item>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      {movies
        .filter(movie => favorite[movie.id])
        .map(movie => (
          <div key={movie.id} style={{ alignItems: "center", gap: "8px",marginTop:"20px", background: "#222", padding: "8px", borderRadius: "8px",maxWidth:'100px' }}>
            <img
              style={{ width: "80px", borderRadius: "4px" }}
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <div>
              <h3 style={{ color: "white", margin: "0", fontSize: "14px" }}>{movie.title}</h3>
              <p style={{ color: "white", margin: "0", fontSize: "12px" }}>⭐ {movie.vote_average}</p>
            </div>
          </div>
        ))}
    </div>

        </Grid>

        <Grid item xs={7}>
          <Item>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              Daha Sonra İzle
              <Clock color="white" size={20} />
            </div>
          </Item>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      {movies
        .filter(movie => watchLater[movie.id])
        .map(movie => (
          <div key={movie.id} style={{ alignItems: "center",marginTop:"20px", gap: "8px", background: "#222", padding: "8px", borderRadius: "8px" ,maxWidth:'100px'}}>
            <img
              style={{ width: "80px", borderRadius: "4px" }}
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <div>
              <h3 style={{ color: "white", margin: "0", fontSize: "14px" }}>{movie.title}</h3>
              <p style={{ color: "white", margin: "0", fontSize: "12px" }}>⭐ {movie.vote_average}</p>
            </div>
          </div>
        ))}
    </div>
        </Grid>

        <Grid item xs={7}>
          <Item>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              İzlenenler
              <SquareCheck color="white" size={20} />
            </div>
          </Item>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      {movies
        .filter(movie => checked[movie.id])
        .map(movie => (
          <div key={movie.id} style={{ alignItems: "center", gap: "8px",marginTop:"20px", background: "#222", padding: "8px", borderRadius: "8px",maxWidth:'100px' }}>
            <img
              style={{ width: "80px", borderRadius: "4px" }}
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <div>
              <h3 style={{ color: "white", margin: "0", fontSize: "14px" }}>{movie.title}</h3>
              <p style={{ color: "white", margin: "0", fontSize: "12px" }}>⭐ {movie.vote_average}</p>
            </div>
          </div>
        ))}
    </div>
        </Grid>

      </Grid>
    </div>
  );
};

export default Profil;
