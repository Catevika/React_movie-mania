import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieVideo from '../MovieVideo/MovieVideo';
import './MovieVideos.css';

export default function MovieVideos({ movieId, apiKey, language }) {
  const [movieVideos, setMovieVideos] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=${language}`);
        setMovieVideos(response.data.results);
      } catch (error) {
        setError(true);
        console.log({ errror: error.message });
      }
    };
    getVideos();
  }, []);


  return (
    <div className='movievideo-container'>
      {!error && movieVideos?.length > 0 ?
        <>
          <p>Vidéos / Trailers: </p>
          <ul className='movievideo-wrapper'>{movieVideos.map(movieVideo =>
            <li key={movieVideo.id}>
              <MovieVideo movieVideo={movieVideo} />
            </li>
          )}
          </ul>
        </>
        : <p>Vidéos / Trailers: <span> Not available</span></p>}
    </div>
  );
}