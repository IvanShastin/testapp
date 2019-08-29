import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup } from "@testing-library/react";
import WeatherPage from "./WeatherPage";

afterEach(cleanup);

const sel = id => `[data-testid="${id}"]`;

test("renders content", () => {
  const component = render(<WeatherPage />);
  const element = component.container.querySelector(sel("temperature"));
  expect(element).toBeDefined();
});
