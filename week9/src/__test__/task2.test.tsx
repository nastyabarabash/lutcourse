import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import MyContainer from "../components/MyContainer";
import MyList from "../components/MyList";
import App from "../App";

jest.mock("../components/MyContainer", () => () => (
  <div data-testid="mycon" />
));
test("Right components created", () => {
  expect(MyContainer).toBeDefined();
  expect(MyList).toBeDefined();
});

test("App.js has MyContainer.js component", () => {
  let { getByTestId } = render(<App />);
  expect(getByTestId(/mycon/)).toBeInTheDocument();
});
