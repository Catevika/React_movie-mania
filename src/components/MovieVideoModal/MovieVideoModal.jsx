import './MovieVideoModal.css';

export default function MovieVideoModal({ moviekey, modalRef, title }) {
  return (
    <div className='movievideo-modal-container'>
      <iframe
        ref={modalRef}
        title={title}
        width='80%'
        height='60%'
        src={`https://www.youtube.com/embed/${moviekey}`} />
    </div>
  );
}