import './MovieModal.css';

export default function MovieModal({ posterPath, toggleModal }) {
  return (
    <div className="movie-modal-container">
      <img src={'https://image.tmdb.org/t/p/w500' + posterPath} alt="Movie poster" />
    </div>
  );
}
