import { MemoryRouter, NavLink } from "react-router-dom";
import { describe, test, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Header from "./components/Header/Header";

const user = userEvent.setup();

describe('Header', () => {
  test('Header renders properly', () => {
    const wrapper = render(<MemoryRouter><Header /></MemoryRouter>);
    expect(wrapper).toBeTruthy();
  });

  test('Header has a main title', () => {
    const { container } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const h1 = container.querySelector('h1');
    expect(h1.textContent).toBe('MovieMania');
  });

  test('Header Home link is initially active', async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const homeNavLink = screen.getByText(/Home/i);
    expect(homeNavLink).toHaveClass('navlink active');
  });

  test('Header Home link has the correct href', async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const homeNavLink = screen.getByText(/Home/i);
    expect(homeNavLink).toHaveAttribute('href', '/');
  });

  test('Header Home link is clickable', async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const homeNavLink = screen.getByText(/Home/i);

    const homeClick = vi.spyOn(user, 'click');
    await user.click(homeNavLink);

    expect(homeClick).toHaveBeenCalledTimes(1);
  });

  test('Header About link has active class when clicked', async () => {
    const { container } = render(
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

    const aboutNavLink = container.querySelector('.navlink');
    expect(aboutNavLink).not.toHaveClass('active');

    const aboutClickFunction = vi.spyOn(user, 'click');
    await user.click(aboutNavLink);

    expect(aboutClickFunction).toHaveBeenCalledTimes(1);
    expect(aboutNavLink).toHaveClass('active');
  });
});

