import Container from "react-bootstrap/Container";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PostEditForm from "./pages/posts/PostEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import toast, { Toaster } from "react-hot-toast";
import NotificationListPage from "./pages/notifications/NotificationListPage";

const notify = () => toast("Here is your toast.");

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <div>
         onClick={notify}
        <Toaster />
      </div>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <PostsPage message="No results Found. Try typing something else." />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <PostsPage
                message="No results Found. Try typing something else or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/liked"
            render={() => (
              <PostsPage
                message="No results Found. Try typing something else or like a post."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <Route
            exact
            path="/favourited"
            render={() => (
              <PostsPage
                message="No results Found. Try typing something else or favourite a post."
                filter={`favourites__owner__profile=${profile_id}&ordering=-favourites__created_at&`}
              />
            )}
          />
          <Route
            exact
            path="/category/:category"
            render={() => (
              <PostsPage message="No results found in this category." />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
          <Route exact path="/notifications" render={() => <NotificationListPage />} />
          <Route exact path="/profiles/:id/" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          <Route render={() => <p>Page not found</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
