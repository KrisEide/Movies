import { useEffect, useState } from "react";
import MovieRow from "./components/MovieRow";
import { movies } from "./data/movies";
import { getMovieDetails } from "./services/tmdb";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadMovies() {
      try {
        const movieDetails = await Promise.all(
          movies.map(async (movie) => {
            const details = await getMovieDetails(movie.tmdbId);

            return {
              ...movie,
              ...details,
            };
          }),
        );

        setMovieList(movieDetails);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadMovies();
  }, []);

  return (
    <main className="page">
      <section className="hero">
        <h1>Kristoffers topp 100 filmer</h1>

        <p className="subtitle">En personlig liste over favorittfilmene mine</p>

        <div className="divider">
          <span></span>
          <strong>✦</strong>
          <span></span>
        </div>
      </section>

      {isLoading && <p className="status-text">Laster filmer...</p>}

      {errorMessage && <p className="status-text error">{errorMessage}</p>}

      {!isLoading && !errorMessage && (
        <section className="movie-list">
          {movieList.map((movie) => (
            <MovieRow key={movie.rank} movie={movie} />
          ))}
        </section>
      )}
    </main>
  );
}

export default App;
