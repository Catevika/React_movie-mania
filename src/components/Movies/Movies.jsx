import { useEffect, useState } from 'react';
import axios from 'axios';
import Movie from '../Movie/Movie';
import './Movies.css';

const apiKey = import.meta.env.VITE_API_KEY;

export default function Movies({ term }) {
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    try {
      const getMovies = async () => {
        setError(false);
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${term}}`);
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
      }) : <div className='message'>No movie found.</div>}
    </div>
  );
}

