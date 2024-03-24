import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom"; 
import NotFound from "../NotFound";

test("renders message", () => {
  render(
    <Router>
      <NotFound text="Sorry, the page you're looking for doesn't exist" />
    </Router>
  );
  const message = screen.getByText(
    "Sorry, the page you're looking for doesn't exist"
  );
  expect(message).toBeInTheDocument();
});