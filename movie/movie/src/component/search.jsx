import React, { useEffect, useState, useRef } from "react";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import { MoveRight } from "lucide-react";
import Popup from 'reactjs-popup';

const Search = () => {
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [query, setQuery] = useState(""); 
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const url = "https://api.themoviedb.org/3/movie/popular?language=tr-TR&page=1";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer YOUR_API_KEY",
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        if (json.results) {
          setImages(json.results);
        }
      })
      .catch((err) => console.error("API Hatası:", err));
  }, []);

  
  //arkaplan görsel
  useEffect(() => {
    if (images.length > 0) {
      startImageRotation();
      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => {
        clearInterval(intervalRef.current);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }
  }, [images]);
  const startImageRotation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        setBackground(`https://image.tmdb.org/t/p/original${images[nextIndex].backdrop_path}`);
        return nextIndex;
      });
    }, 5000);
  };
  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible" && !intervalRef.current) {
      startImageRotation();
    }
  };



  const handleSearch = (searchText) => {
    setQuery(searchText);
    if (searchText.trim() === "") {
      setFilteredMovies([]);
      return;
    }
    const results = images.filter((movie) => movie.title.toLowerCase().startsWith(searchText.toLowerCase()));
    setFilteredMovies(results);
  };


  return (
    <div style={{ position: "relative", width: "100%", height: "100vh"   }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(50%)",
          position: "absolute",
          marginTop: "40px",
          left: 0,
          zIndex: 1,
          transition: "all 0.3s ease-out",
        }}
      ></div>

      <div className="input" style={{ position: "relative", zIndex: 2, padding: "20px" }}>
        <LocalMoviesIcon style={{ color: "#000000", marginRight: "10px" }} />
        <input
          type="text"
          placeholder="Film Ara..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "300px",
            marginRight: "10px",
          }}
        />
        <MoveRight style={{ color: "#000000", cursor: "pointer" }} onClick={() => handleSearch(query)} />
        {filteredMovies.length > 0 && (
        <div
          style={{
            position: "absolute",
            top:"70px",
            background: "#fff",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 3,
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => {
                setSelectedMovie(movie);
                setIsPopupOpen(true);
              }}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #ccc",
              }}
            >
              {movie.title}
            </div>
          ))}
        </div>
      )}
     
      </div>

     

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
  );
};

export default Search;
