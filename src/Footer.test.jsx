import { MemoryRouter } from "react-router-dom";
import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import Footer from "./components/Footer/Footer";


describe('Footer', () => {
  test('Footer renders properly', () => {
    const wrapper = render(<MemoryRouter><Footer /></MemoryRouter>);
    expect(wrapper).toBeTruthy();
  });

  test('Footer text is correct', () => {
    const wrapper = render(<MemoryRouter><Footer /></MemoryRouter>);

    const p = wrapper.container.querySelector('p');
    expect(p?.textContent).toEqual('© Catevika - 2022');
  });
});

