import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import MyList from "../components/MyList";

test("List takes props", () => {
  let items = [
    { id: "5", text: "item number 1", clicked: false },
    { id: "420", text: "item number 2", clicked: true },
  ];
  let props = { header: "Another header", items: items, updateList: jest.fn() };
  let { getByText } = render(<MyList {...props} />);
  expect(getByText(/another header/i)).toBeInTheDocument();
  expect(getByText(/item number 1/i)).toBeInTheDocument();
  expect(getByText(/item number 2/i)).toBeInTheDocument();
});
