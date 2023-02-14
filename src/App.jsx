import { Route, Routes } from 'react-router-dom';
import RouteLayout from './components/RouteLayout/RouteLayout';
import Home from './pages/Home/Home';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Credits from './pages/Credits/Credits';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import NoMatch from './pages/NoMatch/NoMatch';
import './App.css';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<RouteLayout />} errorElement={<ErrorBoundary />} end>
          <Route index element={<Home />} errorElement={<ErrorBoundary />} />
          <Route path='movie/:movieId' element={<MovieDetails />} errorElement={<ErrorBoundary />} />
          <Route path='about' element={<About />} errorElement={<ErrorBoundary />} />
          <Route path='contact' element={<Contact />} errorElement={<ErrorBoundary />} />
          <Route path='credits' element={<Credits />} errorElement={<ErrorBoundary />} />
          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
