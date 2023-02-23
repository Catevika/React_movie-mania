import { Route, Routes } from 'react-router-dom';
import RouteLayout from './components/RouteLayout/RouteLayout';
import Home from './pages/Home/Home';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Credits from './pages/Credits/Credits';
import NoMatch from './pages/NoMatch/NoMatch';
import './App.css';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<RouteLayout />} >
          <Route index element={<Home />} />
          <Route path='movie/:movieId' element={<MovieDetails />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='credits' element={<Credits />} />
          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
