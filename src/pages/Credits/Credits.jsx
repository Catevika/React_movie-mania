import TMDBlogo from '../../assets/TMDB-logo.svg';
import './Credits.css';

export default function Credits() {
  return (
    <div className='credits-container'>
      <h2>Credits</h2>
      <div className='logo-container'>
        <img title='The Movie Database' src={TMDBlogo} alt="TMDB logo" />
      </div>
      <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
    </div>
  );
}
