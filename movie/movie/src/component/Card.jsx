import React, { useEffect, useRef, useState } from "react";
import "./index.css";

const Card = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?language=tr-TR&page=3",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGM0OGJmZTFhNGY2ZjgxZDRjMTNmMzM3NWUwMTA2OCIsIm5iZiI6MTc0MDM5MzYzMS4wNTIsInN1YiI6IjY3YmM0YzlmNTVlMzk5NGJiZDQ2YjJlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eR7fD2C8c_yur5PZ-8Lx6qh6i9CQO-BAg8sTGpr_5Sk",
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };
    fetchMovies();
  }, []);

  // Fare olayları
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };



  // Kart oluşturma
  const getMovieCard = (movie) => {
    return (
      <div className="card" key={movie.id}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="card-image"
        />
        <div className="card-info">
          <p className="card-title" style={{color: "black"}}>{movie.title}</p>
          <p className="card-vote">⭐ {movie.vote_average}</p>

        </div>
      </div>
    );
  };

  return (
    <div className="card-gallery">
      <div
        className="scroll-container"
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
      >
        {movies.map((movie) => getMovieCard(movie))}
      </div>
    </div>
  );
};

export default Card;
 