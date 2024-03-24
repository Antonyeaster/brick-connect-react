import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SignUpForm from "../SignUpForm";

test("renders Sign up page", () => {
  render(
    <Router>
      <SignUpForm />
    </Router>
  );

  // Check to see if username field place holder is there
  const username = screen.getByPlaceholderText("Username");
  expect(username).toBeInTheDocument();

  // Check to see if password field place holder is there
  const password = screen.getByPlaceholderText("Password");
  expect(password).toBeInTheDocument();
  
  // Check to see if password2 field place holder is there
  const password2 = screen.getByPlaceholderText("Confirm Password");
  expect(password2).toBeInTheDocument();

  // Check to see if the Sign Up button is there
  const submitButton = screen.getByRole("button", { name: "Sign Up" });
  expect(submitButton).toBeInTheDocument();
});
