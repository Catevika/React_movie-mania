import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MoviePoster from '../../components/MoviePoster/MoviePoster';
import MovieVideos from '../../components/MovieVideos/MovieVideos';
import './MovieDetails.css';

export default function MovieDetails() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const language = 'en-US';

  const { movieId } = useParams();
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(false);

  const [movieInfos, setMovieInfos] = useState([]);
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [productionCompanies, setProductionCompanies] = useState([]);
  const [productionCountries, setProductionCountries] = useState([]);

  useEffect(() => {
    try {
      const getMovieInfos = async () => {
        setSearching(true);
        setError(false);
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=${language}`);
        setMovieInfos(response.data);
        setGenres(response.data.genres);
        setLanguages(response.data.spoken_languages);
        setProductionCompanies(response.data.production_companies);
        setProductionCountries(response.data.production_countries);
        setSearching(false);
      };
      if (movieInfos) getMovieInfos();
    } catch (error) {
      setError(true);
      console.log({ errror: error.message });
    }
  }, [movieId]);

  return (
    <div className='moviedetails-container'>
      {!error && !searching ? <div className='moviedetails-wrapper'>
        <MoviePoster movieId={movieId} />
        <div className='moviedetails'>
          <h2>{movieInfos.title}</h2>
          {movieInfos?.tagline ? <h3 className='moviedetails-tagline'>{movieInfos.tagline}</h3> : null}
          <p className='moviedetails-overview'>{movieInfos.overview}</p>

          {genres?.length === 1 ? <p>Genre: <span>{genres.map(genre => genre.name)}</span></p>
            : genres?.length > 1 ? <p>Genres: <span>{genres.map(genre => genre.name).join(' - ')}</span></p>
              : null}

          <p className='moviedetails-release-date'>Release date: <span>{movieInfos.release_date}</span></p>

          {languages?.length === 1 ? <p>Language: <span>{languages.map(language => language.english_name)}</span></p>
            : languages?.length > 1 ? <p>Languages: <span>{languages.map(language => language.english_name).join(' - ')}</span></p>
              : null}

          <div className='moviedetails-card'>
            <p>Budget: {movieInfos?.budget !== 0 ? <span>{new Intl.NumberFormat({ language }, { maximumSignificantDigits: 2 }).format((movieInfos.budget))}</span> : <span>Not available</span>}</p>

            <p>Revenue: {movieInfos?.revenue !== 0 ? <span>{new Intl.NumberFormat({ language }, { maximumSignificantDigits: 2 }).format((movieInfos.revenue))}</span> : <span>Not available</span>}</p>
          </div>

          <div className='moviedetails-bottom'>
            {productionCompanies?.length === 1 ? <p> Production country: <span>{productionCountries.map(productionCountry => productionCountry.iso_3166_1)}</span></p>
              : productionCountries?.length > 1 ? <p>Production countries: <span>{productionCountries.map(productionCountry => productionCountry.iso_3166_1).join(' - ')}</span></p>
                : null}

            {productionCompanies?.length === 1 ? <p> Production company: <span>{productionCompanies.map(productionCompany => productionCompany.name)}</span></p>
              : productionCompanies?.length > 1 ? <p> Production companies: <span>{productionCompanies.map(productionCompany => productionCompany.name).join(' - ')}</span></p>
                : null}

            <MovieVideos movieId={movieId} apiKey={apiKey} language={language} />
          </div>

        </div>
      </div> : <p className='message'>No movie details found.</p>}
    </div>
  );
}
