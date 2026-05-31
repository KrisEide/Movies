function MovieRow({ movie }) {
  return (
    <article className="movie-row">
      <div className="movie-rank">{movie.rank}</div>

      <div className="movie-poster">
        {movie.posterUrl ? (
          <img src={movie.posterUrl} alt={`Poster for ${movie.title}`} />
        ) : (
          <span>{movie.title}</span>
        )}
      </div>

      <div className="movie-info">
        <h2>{movie.title}</h2>
        <p className="movie-year">{movie.year}</p>
      </div>

      <div className="movie-rating">
        <span className="rating-source">IMDb</span>
        <span className="rating-number">{movie.imdbRating}</span>
      </div>
    </article>
  );
}

export default MovieRow;
