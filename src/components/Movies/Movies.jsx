import { useEffect, useState } from 'react';
import { getMovieData } from '../../api/api';
import Movie from '../Movie/Movie';
import './Movies.css';


export default function Movies({ term }) {
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    try {
      const getMovies = async () => {
        setError(false);
        const response = await getMovieData(term);
        setMovies(response.data.results);
      };
      if (term) getMovies();
    } catch (error) {
      setError(true);
      console.log({ errror: error.message });
    }
  }, [term]);

  return (
    <div className='movies-container'>
      {!error && movies?.length > 0 ? movies.map(movie => {
        return <div className='movie-container' key={movie.id}><Movie movie={movie} /></div>;
      }) : <div className='message'>No movie available yet.</div>}
    </div>
  );
}

