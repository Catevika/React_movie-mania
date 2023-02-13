import { render } from "@testing-library/react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import RouteLayout from "../components/RouteLayout/RouteLayout";
import Home from "../pages/Home/Home";


describe('ErrorBoundary', () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/xyz' element={<RouteLayout />} errorElement={<ErrorBoundary />} >
        <Route index element={<Home />} errorElement={<ErrorBoundary />} />
      </Route>
    ));

  test('should respond with error', () => {
    const wrapper = render(<RouterProvider router={router} />);

    const p = wrapper.container.querySelector('p');


    expect(p.textContent).toBe('💿 Hey developer 👋');
  });

});;