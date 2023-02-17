import { BrowserRouter, MemoryRouter, NavLink } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import App from "../App";
import Header from "../components/Header/Header";

const user = userEvent.setup();

describe('Header', () => {
  test('Header has a main title', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('MovieMania')).toBeInTheDocument();
  });

  test('Header Home link is initially active', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const homeNavLink = screen.getByText('Home');
    expect(homeNavLink).toHaveClass('navlink active');
  });

  test('Header Home link has the correct href', async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const homeNavLink = screen.getByText('Home');
    expect(homeNavLink).toHaveAttribute('href', '/');
  });

  test('Header About should navigate to About page when clicked', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const aboutNavLink = screen.getByText('About');

    await waitFor(() => user.click(aboutNavLink));

    expect(screen.getByText('Author')).toBeInTheDocument();
  });

  test('Header Contact should navigate to Contact page when clicked', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const contactNavLink = screen.getByText('Contact');

    await waitFor(() => user.click(contactNavLink));

    expect(screen.getByText('Contact us:')).toBeInTheDocument();
  });

  test('Header Credits should navigate to Contact page when clicked', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const creditsNavLink = screen.getByText('Credits');

    await waitFor(() => user.click(creditsNavLink));

    expect(screen.getByText('This product uses The Movie Database (TMDB) API but is not endorsed or certified by TMDB.')).toBeInTheDocument();
  });

  test('Header About link should get active class when clicked', async () => {
    render(
      <MemoryRouter>
        <NavLink
          to='/about'
          className={({ isActive }) =>
            isActive ? 'navlink active' : 'navlink'
          }
        >
          About
        </NavLink>
      </MemoryRouter>
    );

    const aboutNavLink = screen.getByText('About');
    expect(aboutNavLink).not.toHaveClass('active');

    await waitFor(() => user.click(aboutNavLink));

    expect(aboutNavLink).toHaveClass('active');
  });
});