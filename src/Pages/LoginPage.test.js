import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup } from "@testing-library/react";
import LoginPage from "./LoginPage";

afterEach(cleanup);

test("renders content", () => {
  const loginHandler = jest.fn();
  const expectedContent = "Please sign in to access your account";
  const component = render(<LoginPage loginHandler={loginHandler} />);
  const element = component.getByText(expectedContent);
  expect(element).toBeDefined();
});
