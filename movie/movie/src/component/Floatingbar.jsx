import React, {useEffect, useState } from "react";
import './index.css';
import { Menu, X, Clock, Heart, SquareCheck } from 'lucide-react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { firestore, auth } from '../config'; 
import { collection, doc, setDoc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";
import Pagination from "./pagination";

const Floatingbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [clickedIcons, setClickedIcons] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage =20;
  const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGM0OGJmZTFhNGY2ZjgxZDRjMTNmMzM3NWUwMTA2OCIsIm5iZiI6MTc0MDM5MzYzMS4wNTIsInN1YiI6IjY3YmM0YzlmNTVlMzk5NGJiZDQ2YjJlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eR7fD2C8c_yur5PZ-8Lx6qh6i9CQO-BAg8sTGpr_5Sk';

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?language=tr-TR", {
          headers: { Authorization: `Bearer ${API_TOKEN}`, 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Türler alınırken hata oluştu:", error);
      }
    };

    fetchGenres();
  }, []);


  const handlePagination = (pageNumber) => {
    console.log("Seçilen Sayfa:", pageNumber);
    setCurrentPage(pageNumber);
  };
  


  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const moviesRef = collection(firestore, `users/${user.uid}/movies`);
  
        const unsubscribeFirestore = onSnapshot(moviesRef, (snapshot) => {
          const iconsData = {};
          snapshot.forEach((doc) => {
            iconsData[doc.id] = doc.data();
          });
          console.log("Firestore'dan gelen icon verileri:", iconsData);
          setClickedIcons(iconsData);
        });
  
        return () => unsubscribeFirestore();
      }
    });
  
    return () => unsubscribeAuth();
  }, []);
  


useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = selectedGenre
          ? `https://api.themoviedb.org/3/discover/movie?with_genres=${selectedGenre}&language=tr-TR&page=${currentPage}`
          : `https://api.themoviedb.org/3/movie/popular?language=tr-TR&page=${currentPage}`;
  
        console.log("Fetching movies from:", url);
  
        const response = await fetch(url, {
          headers: {
            Authorization:` Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
          },
        });
  
        const data = await response.json();
        console.log("Gelen veriler:", data.results);
        
        setMovies(data.results);
      } catch (error) {
        console.error("Filmler alınırken hata oluştu:", error);
      }
    };
  
    fetchMovies();
  
  }, [selectedGenre, currentPage]);
  
  


   
  const handleIconClick = async (movie, iconType) => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      alert("Lütfen giriş yapın!");
      return;
    }

    const movieRef = doc(firestore, `users/${userId}/movies`, movie.id.toString());

    try {
      const movieDoc = await getDoc(movieRef);
      const currentData = movieDoc.exists() ? movieDoc.data() : {};

      const updatedIcons = {
        ...currentData,
        [iconType]: !currentData[iconType], 
      };

      if (movieDoc.exists()) {
        await updateDoc(movieRef, updatedIcons);
      } else {
        await setDoc(movieRef, {
          title: movie.title,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
          release_date: movie.release_date,
          ...updatedIcons,
        });
      }

      setClickedIcons((prevState) => ({
        ...prevState,
        [movie.id]: updatedIcons,
      }));

      console.log("Film güncellendi:", updatedIcons);
    } catch (err) {
      console.error("Firestore güncelleme hatası:", err);
    }
  };
 
 const getDetail = (movie) => {
    setSelectedMovie(movie);
    setIsPopupOpen(true);
  };

  return (
    <div>
      <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul>
          {genres.map((genre) => (
            <li className="genre-list" key={genre.id} onClick={() => setSelectedGenre(genre.id)}>
              {genre.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="movies-container">
        {movies.map((movie) => {
          console.log(clickedIcons)
          const movieState = clickedIcons[movie.id] || {};

          return (
            <div key={movie.id} className="movie-card" onClick={() => getDetail(movie)}>
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
              <h3>{movie.title}</h3>
              <p>⭐ {movie.vote_average}</p>
              <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                <SquareCheck
                  color="black"
                  fill={movieState.checked ? "green" : "white"}
                  size={20}
                  onClick={(e) => { e.stopPropagation(); handleIconClick(movie, "checked"); }}
                />
                <Heart
                  color="red"
                  fill={movieState.favorite ? "red" : "white"}
                  size={20}
                  onClick={(e) => { e.stopPropagation(); handleIconClick(movie, "favorite"); }}
                />
                <Clock
                  color="black"
                  fill={movieState.watchLater ? "grey" : "white"}
                  size={20}
                  onClick={(e) => { e.stopPropagation(); handleIconClick(movie, "watchLater"); }}
                />
              </div>
            </div>
          );
        })}
          {selectedMovie && (
                <Popup contentStyle={{ backgroundColor: "#8B0000" }} open={isPopupOpen} onClose={() => setIsPopupOpen(false)} modal>
                  <div className="popup-content">
                    <h2 className="movie-title">{selectedMovie.title}</h2>
                    <img className="movie-image" src={`https://image.tmdb.org/t/p/w300${selectedMovie.backdrop_path}`} alt={selectedMovie.title} />
                    <p className="movie-description">{selectedMovie.overview}</p>
                    <p className="movie-rating"> ⭐ {selectedMovie.vote_average}</p>
                    <p className="movie-description">{selectedMovie.release_date}</p>
                    <button className="close-button" onClick={() => setIsPopupOpen(false)}>Kapat</button>
                  </div>
                </Popup>
              )}
      </div>

      <Pagination
        postsPerPage={moviesPerPage}
        length={movies.length}
        currentPage={currentPage}
        handlePagination={handlePagination}
      />
    </div>
  );
};

export default Floatingbar;
