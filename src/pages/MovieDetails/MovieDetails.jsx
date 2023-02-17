import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetailsData } from '../../api/api';
import MoviePoster from '../../components/MoviePoster/MoviePoster';
import MovieVideos from '../../components/MovieVideos/MovieVideos';
import './MovieDetails.css';

export default function MovieDetails() {
  const language = 'en-US';
  const apiKey = import.meta.env.VITE_API_KEY;

  const { movieId } = useParams();
  const [searching, setSearching] = useState(false);

  const [movieInfos, setMovieInfos] = useState([]);
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [productionCompanies, setProductionCompanies] = useState([]);
  const [productionCountries, setProductionCountries] = useState([]);

  useEffect(() => {
    const getMovieInfos = async () => {
      setSearching(true);
      const response = await getMovieDetailsData(movieId);
      response && setMovieInfos(response.data);
      response && setGenres(response.data.genres);
      response && setLanguages(response.data.spoken_languages);
      response && setProductionCompanies(response.data.production_companies);
      response && setProductionCountries(response.data.production_countries);
      setSearching(false);
    };
    if (movieInfos) getMovieInfos();
  }, [movieId]);

  return (
    <div className='moviedetails-container'>
      {!searching ? <div className='moviedetails-wrapper'>
        <MoviePoster movieId={movieId} />
        <div className='moviedetails'>
          <h2>{movieInfos.title}</h2>
          {movieInfos?.tagline ? <h3 className='moviedetails-tagline'>{movieInfos.tagline}</h3> : <p>Tagline: Not available</p>}
          {movieInfos?.overview ? <p className='moviedetails-overview'>{movieInfos.overview}</p> : <p>Overview: Not available</p>}

          {genres.length === 1 ? <p>Genre: <span>{genres.map(genre => genre.name)}</span></p>
            : genres.length > 1 ? <p>Genres: <span>{genres.map(genre => genre.name).join(' - ')}</span></p> : <p>Genre: <span>Not available</span></p>}

          <p className='moviedetails-release-date'>Release date: {movieInfos.release_date ? <span>{movieInfos.release_date}</span> : <span>Not available</span>}</p>

          {languages?.length === 1 ? <p>Language: <span>{languages.map(language => language.english_name)}</span></p>
            : languages?.length > 1 ? <p>Languages: <span>{languages.map(language => language.english_name).join(' - ')}</span></p>
              : <p>Language: <span>Not available</span></p>}

          <div className='moviedetails-card'>
            <p>Budget: {movieInfos?.budget !== 0 ? <span>{new Intl.NumberFormat({ language }, { maximumSignificantDigits: 2 }).format((movieInfos.budget))}</span> : <span>Not available</span>}</p>

            <p>Revenue: {movieInfos?.revenue !== 0 ? <span>{new Intl.NumberFormat({ language }, { maximumSignificantDigits: 2 }).format((movieInfos.revenue))}</span> : <span>Not available</span>}</p>
          </div>

          <div className='moviedetails-bottom'>
            {productionCountries?.length === 1 ? <p> Production country: <span>{productionCountries.map(productionCountry => productionCountry.iso_3166_1)}</span></p>
              : productionCountries?.length > 1 ? <p>Production countries: <span>{productionCountries.map(productionCountry => productionCountry.iso_3166_1).join(' - ')}</span></p>
                : <p> Production country: <span>Not available</span></p>}

            {productionCompanies?.length === 1 ? <p> Production company: <span>{productionCompanies.map(productionCompany => productionCompany.name)}</span></p>
              : productionCompanies?.length > 1 ? <p> Production companies: <span>{productionCompanies.map(productionCompany => productionCompany.name).join(' - ')}</span></p>
                : <p> Production company: <span>Not available</span></p>}

            <MovieVideos movieId={movieId} apiKey={apiKey} language={language} />
          </div>
        </div>
      </div> : <p className='message'>No movie details found yet.</p>}
    </div>
  );
}
