import { useEffect, useState } from "react";
import "./App.css";
import searchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com/?apikey=2f7a6f39";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
    console.log(data.Search);
  };

  useEffect(() => {
    searchMovies("");
  }, []); // empty array calls the useEffect only at start

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input placeholder="search for movies" 
        value={searchTerm} 
        onChange={(e) => {setSearchTerm(e.target.value)}} />
        <img src={searchIcon} alt="search" onClick={() => {searchMovies(searchTerm)}} />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.Title} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
      <button type="button" onClick={ () => {}}>LOAD MORE</button>
    </div>
  );
};

export default App;
