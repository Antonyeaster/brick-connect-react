import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CurrentUserProvider } from "../../../contexts/CurrentUserContext";
import NotificationListPage from "../NotificationListPage";

const renderLoggedInNotificationListPage = () => {
  render(
    <BrowserRouter>
      <CurrentUserProvider>
        <NotificationListPage />
      </CurrentUserProvider>
    </BrowserRouter>
  );
};

// Render the notification page title
test("renders title of notifications page for logged in users", async () => {
  renderLoggedInNotificationListPage();
  const loggedInTitle = await screen.findByText("Notifications");
  expect(loggedInTitle).toBeInTheDocument();
});
