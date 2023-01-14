import { useRef, useState } from 'react';
import MovieVideoModal from '../MovieVideoModal/MovieVideoModal';

export default function MovieVideo({ movieVideo }) {
  const { name, key } = movieVideo;
  const modalRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

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
    <div onClick={handleClick} >
      {name}
      {isOpen ? <MovieVideoModal moviekey={key} modalRef={modalRef} title={name} /> : null}</div>
  );
}
