import { NavLink } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className='header-container'>
      <nav>
        <h1>MovieMania</h1>
        <NavLink to='/' className={({ isActive }) =>
          isActive ? 'navlink active' : 'navlink'
        }>Home</NavLink>
        <NavLink to='/about' className={({ isActive }) =>
          isActive ? 'navlink active' : 'navlink'
        }>About</NavLink>
        <NavLink to='/contact' className={({ isActive }) =>
          isActive ? 'navlink active' : 'navlink'
        }>Contact</NavLink>
        <NavLink to='/credits' className={({ isActive }) =>
          isActive ? 'navlink active' : 'navlink'
        }>Credits</NavLink>
      </nav>
    </header>
  );
}
