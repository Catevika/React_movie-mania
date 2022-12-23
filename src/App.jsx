import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import RouteLayout from './components/RouteLayout/RouteLayout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Credits from './pages/Credits/Credits';
import './App.css';

// TODO: Add the * route for NoMatch

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RouteLayout />} >
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='credits' element={<Credits />} />
    </Route>
  )
);

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
