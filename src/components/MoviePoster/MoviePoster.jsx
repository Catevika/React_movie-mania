import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MoviePoster({ movieId }) {
  const [posterUrl, setPosterUrl] = useState(null);

  useEffect(() => {
    const getMoviePoster = async () => {
      const apiKey = import.meta.env.VITE_API_KEY;
      const language = 'en-US';

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=${language}`
        );

        const posterPath = response.data.poster_path;

        if (posterPath !== null) setPosterUrl(
          `https://image.tmdb.org/t/p/w500${posterPath}`
        );
      } catch (error) {
        console.error(error);
      }
    };

    getMoviePoster();
  }, [movieId]);

  if (!posterUrl) {
    return null;
  }

  return (
    <>
      {posterUrl ? <img src={posterUrl} alt="Movie Poster" /> : null}
    </>
  );
};





