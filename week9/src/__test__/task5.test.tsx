import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MyContainer from "../components/MyContainer";

test("conditional rendering", async () => {
  let { getAllByRole } = render(<MyContainer />);
  const style = window.getComputedStyle(getAllByRole("listitem")[0]);
  expect(style.textDecoration).toBe("");

  //Clicking the first item in the list
  userEvent.click(getAllByRole("listitem")[0]);

  //wrapping the test for timeout, because it might take long to set the right
  //style and re-render it.
  await waitFor(
    () => {
      const style = window.getComputedStyle(getAllByRole("listitem")[0]);
      expect(style.textDecoration).toBe("line-through");
    }
  );
});
