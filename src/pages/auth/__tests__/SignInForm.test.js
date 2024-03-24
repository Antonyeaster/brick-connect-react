import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SignInForm from "../SignInForm";

test("renders Sign in page", () => {
  render(
    <Router>
      <SignInForm />
    </Router>
  );

  // Check to see if username field place holder is there
  const username = screen.getByPlaceholderText("Username");
  expect(username).toBeInTheDocument();

  // Check to see if password field place holder is there
  const password = screen.getByPlaceholderText("Password");
  expect(password).toBeInTheDocument();

  // Check to see if the Sign In button is there
  const submitButton = screen.getByRole("button", { name: "Sign In" });
  expect(submitButton).toBeInTheDocument();
});
