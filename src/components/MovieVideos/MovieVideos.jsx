import { useEffect, useState } from 'react';
import { getMovieVideoData } from '../../api/api';
import MovieVideo from '../MovieVideo/MovieVideo';
import './MovieVideos.css';

export default function MovieVideos({ movieId }) {
  const [movieVideos, setMovieVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      const response = await getMovieVideoData(movieId);
      response && setMovieVideos(response.data.results);
    };
    if (movieVideos) getVideos();
  }, []);


  return (
    <div className='movievideo-container'>
      {movieVideos?.length > 0 ?
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