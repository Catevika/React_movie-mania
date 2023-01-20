import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieModal from '../MovieModal/MovieModal';
import { MdOutlineImageNotSupported } from 'react-icons/md';
import './Movie.css';

export default function Movie({ movie }) {

  const { id, poster_path, title, release_date, original_language, overview, vote_average, vote_count } = movie;

  const modalRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const style = isOpen ? { 'cursor': 'pointer' } : { 'cursor': 'auto' };

  const scrollbarVisible = () => {
    if (typeof window != 'undefined' && window.document)
      document.body.style.overflow = 'hidden';
  };

  const scrollbarHidden = () => {
    document.body.style.overflow = 'unset';
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
    isOpen ? scrollbarHidden() : scrollbarVisible();
  };

  function handleClick(e) {
    if (e.target.value !== modalRef.current) {
      toggleModal();
    }
  }

  return (
    <div className='movie-wrapper' onClick={isOpen ? handleClick : null} style={style}>
      {poster_path ? <img src={'https://image.tmdb.org/t/p/w500' + poster_path} alt="Movie poster" ref={modalRef} onClick={toggleModal} className='movie-wrapper-img' /> : <div className='image-replacement'><p>No poster available</p><p><MdOutlineImageNotSupported /></p>
      </div>}
      <h3>{title}</h3>
      <p><strong>Release Date:</strong> {release_date}</p>
      <p><strong>Original language:</strong> {original_language}</p>
      <p><strong>Overview:</strong> {overview ? overview : 'none'}</p>
      <p><strong>Vote average:</strong> <span>{vote_average}</span> <strong>Vote count:</strong> <span>{vote_count}</span></p>
      <Link to={`movie/${id}`} className='movie-btn'>Details</Link>
      {isOpen && (
        <MovieModal posterPath={poster_path} />
      )}
    </div>

  );
}
