import NotFound from '../../assets/404.jpg';
import './NoMatch.css';

export default function NoMatch() {
  return (
    <div className='nomatch-container'>
      <div className='nomatch-wrapper'><img src={NotFound} alt='404 - Not found page' /></div>
    </div>
  );
}