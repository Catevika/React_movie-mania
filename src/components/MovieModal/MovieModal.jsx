import './MovieModal.css';

export default function MovieModal({ posterPath }) {
  return (
    <div id='movie-modal-container' className='movie-modal-container' >
      <img src={'https://image.tmdb.org/t/p/w500' + posterPath} alt="Movie poster" className='movie-modal-container-img' />
    </div >
  );
}
