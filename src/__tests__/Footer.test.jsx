import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer/Footer";


describe('Footer', () => {
  test('Footer text is correct', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>);

    expect(screen.getByText('© Catevika - 2022')).toBeInTheDocument();
  });
});

