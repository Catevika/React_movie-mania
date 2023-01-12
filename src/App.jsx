import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import RouteLayout from './components/RouteLayout/RouteLayout';
import Home from './pages/Home/Home';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Credits from './pages/Credits/Credits';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import NoMatch from './pages/NoMatch/NoMatch';
import './App.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RouteLayout />} errorElement={<ErrorBoundary />} >
      <Route index element={<Home />} errorElement={<ErrorBoundary />} />
      <Route path='movie/:movieId' element={<MovieDetails />} errorElement={<ErrorBoundary />} />
      <Route path='about' element={<About />} errorElement={<ErrorBoundary />} />
      <Route path='contact' element={<Contact />} errorElement={<ErrorBoundary />} />
      <Route path='credits' element={<Credits />} errorElement={<ErrorBoundary />} />
      <Route path='*' element={<NoMatch />} />
    </Route>
  )
);

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
