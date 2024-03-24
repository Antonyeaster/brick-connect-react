import { render, screen } from "@testing-library/react";
import Asset from "../Asset";

test("renders a spinner", () => {
  render(<Asset spinner={true} />);
  const spinnerTest = screen.getByTestId("testing-spinner-id");
  expect(spinnerTest).toBeInTheDocument();
});

test("renders a message", () => {
  render(<Asset message="Testing" />);
  const messageTest = screen.getByText("Testing");
  expect(messageTest).toBeInTheDocument();
});