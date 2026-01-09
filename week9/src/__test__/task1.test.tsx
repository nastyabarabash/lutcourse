import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import * as React from "react";

test("React is imported", () => {
  expect(React);
});

test("renders 'hello world'", () => {
  const { getByText } = render(<App />);
  const helloText = getByText(/.*Hello World.*/i);
  expect(helloText).toBeInTheDocument();
});
