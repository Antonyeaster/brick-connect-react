import {
  render,
  act,
  fireEvent,
  screen,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../NavBar";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";

test("renders NavBar", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  //   screen.debug();
  const signInLink = screen.getByText("Sign In");
  expect(signInLink).toBeInTheDocument();
});

test("renders link to the user profile for a logged in user", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const profileAvatar = await screen.findByText("Antony_E");
  expect(profileAvatar).toBeInTheDocument();
});

test("renders Sign in and Sign up buttons again on sign out", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  await act(async () => {
    const signOutLink = await screen.findByRole("link", { name: "Sign Out" });
    fireEvent.click(signOutLink);

    const confirmationModal = await screen.findByRole("dialog");
    expect(confirmationModal).toBeInTheDocument();

    // Click on the confirm button in the modal to trigger full sign out
    const confirmButton = screen.getByRole("button", { name: "Confirm" });
    fireEvent.click(confirmButton);
  });

  // Wait for sign-out functionality to take effect then look for sign in and up
  await waitFor(() => {
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });
});

test("renders Notifications link for a user thats logged in", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const NotificationsLink = await screen.findByRole("link", { name: "Notifications" });
  expect(NotificationsLink).toBeInTheDocument();
});
