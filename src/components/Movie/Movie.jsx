import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineImageNotSupported } from 'react-icons/md';
import './Movie.css';
import MovieModal from '../MovieModal/MovieModal';

export default function Movie({ movie }) {
  const posterPath = movie.poster_path;

  const modalRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  function handleClick(e) {
    if (!modalRef.current.contains(e.target.value)) {
      toggleModal();
    }
  }

  return (
    <div className='movie-wrapper' onClick={handleClick}>
      {posterPath ? <img src={'https://image.tmdb.org/t/p/w500' + posterPath} alt="Movie poster" ref={modalRef} onClick={toggleModal} /> : <div className='image-replacement'><p>No poster available</p><p><MdOutlineImageNotSupported /></p>
      </div>}
      <h3>{movie.original_title}</h3>
      <p><strong>Release Date</strong>{movie.release_date}</p>
      <p><strong>Original language:</strong> {movie.original_language}</p>
      <p><strong>Overview:</strong> {movie.overview ? movie.overview : 'none'}</p>
      <p><strong>Vote average:</strong> <span>{movie.vote_average}</span> <strong>Vote count:</strong> <span>{movie.vote_count}</span></p>
      <Link to={`movies/${movie.id}`}><button className='movie-btn'>Details</button></Link>
      {isOpen && (
        <MovieModal posterPath={posterPath} toggleModal={toggleModal} />
      )}
    </div>

  );
}
