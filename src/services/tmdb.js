const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

export async function getMovieDetails(tmdbId) {
  if (!accessToken) {
    throw new Error("Mangler VITE_TMDB_ACCESS_TOKEN i .env.local");
  }

  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${tmdbId}?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Kunne ikke hente film med TMDB ID ${tmdbId}`);
  }

  const data = await response.json();

  return {
    tmdbId: data.id,
    title: data.title,
    year: data.release_date ? data.release_date.slice(0, 4) : "",
    posterUrl: data.poster_path
      ? `${TMDB_IMAGE_BASE_URL}${data.poster_path}`
      : null,
  };
}
