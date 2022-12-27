import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import RouteLayout from './components/RouteLayout/RouteLayout';
import Home from './pages/Home/Home';
import MovieDetails from './components/MovieDetails/MovieDetails';
import About from './pages/About/About';
import Credits from './pages/Credits/Credits';
import NoMatch from './pages/noMatch/noMatch';
import './App.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RouteLayout />} >
      <Route index element={<Home />} />
      <Route path='movies/:id' element={<MovieDetails />} />
      <Route path='about' element={<About />} />
      <Route path='credits' element={<Credits />} />
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
