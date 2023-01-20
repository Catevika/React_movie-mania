import { MemoryRouter } from "react-router-dom";
import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import About from "./About";

describe('About', () => {
  test('About renders properly', () => {
    const wrapper = render(<MemoryRouter><About /></MemoryRouter>);
    expect(wrapper).toBeTruthy();
  });
});