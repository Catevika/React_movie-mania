import { BiSearchAlt } from 'react-icons/bi';
import { FaMobileAlt } from 'react-icons/fa';
import './About.css';

export default function About() {
  return (
    <section className='about-container'>
      <div className='about-wrapper'>
        <div className='about-card'>
          <p className='about-item-text small'><span>Author</span> Dominique Bello, also known as <strong>Catevika</strong></p>
        </div>
        <div className='about-card'>
          <p className='about-item-text small'><span>Development</span><strong> Dec. 2022 - Jan. 2023</strong></p>
        </div>
        <div className='about-card'>
          <p><span>Source</span></p>
          <p className='about-item-text small'><span>TMDB</span> is among the best sites with <strong>millions of movies, TV shows and people to discover.</strong></p>
        </div>
        <div className='about-card'>
          <p><span>Project</span></p>
          <p className='about-item-text small'><span>MovieMania</span> is a <strong>custom version</strong> of the services it offers at a <strong>movie</strong> level for <strong>learning purpose</strong></p>
        </div>
        <div className='about-card'>
          <p><span>Techniques</span></p>
          <ul>
            <li className='about-item'>
              <FaMobileAlt className='about-icon' data-testid="mobile" />
              <p className='about-item-text'>Fully <strong>responsive</strong> format starting from <strong>320px</strong> wide</p>
            </li>
            <li className='about-item'>
              <BiSearchAlt className='about-icon big' data-testid="search" />
              <p className='about-item-text'><strong> Search bar</strong> to find amaizing movies and their trailers</p>
            </li>
          </ul>
        </div>
      </div>
    </section >
  );
}

