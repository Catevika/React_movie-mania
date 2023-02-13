import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import About from "../pages/About/About";

describe('About', () => {
  test('Texts should be displayed correctly', () => {
    render(<MemoryRouter><About /></MemoryRouter>);

    screen.getByText('Author');
    screen.getByText('Dominique Bello, also known as');
    screen.getByText('Catevika');

    screen.getByText('Source');
    screen.getByText('TMDB');
  });

  test('should display the correct icons', () => {
    render(<MemoryRouter><About /></MemoryRouter>);

    expect(screen.getByTestId('mobile')).toBeInTheDocument();
    expect(screen.getByTestId('search')).toBeInTheDocument();
  });
});