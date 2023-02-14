import { useEffect, useState } from 'react';
import { getMovieData } from '../../api/api';
import Movie from '../Movie/Movie';
import './Movies.css';


export default function Movies({ term }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const response = await getMovieData(term);
      response && setMovies(response.data.results);
    };
    if (term) getMovies();
  }, [term]);

  return (
    <div className='movies-container'>
      {movies?.length > 0 ? movies.map(movie => {
        return <div className='movie-container' key={movie.id}><Movie movie={movie} /></div>;
      }) : <div className='message'>No movie available yet.</div>}
    </div>
  );
}

