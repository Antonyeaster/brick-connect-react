import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";
import Avatar from "./Avatar";

const NavBar = () => {
  const currentUser = useCurrentUser();

  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };
  const addNewPost = (
    <NavLink to="/posts/create">
      <i className="fa-solid fa-square-plus"></i>Add Post
    </NavLink>
  );
  const loggedInIcons = (
    <>
      <NavLink to="/feed">
        <i className="fas fa-stream"></i>Feed
      </NavLink>

      <NavLink to="/liked">
        <i className="fas fa-heart"></i>Liked
      </NavLink>

      <NavLink to="/favourited">
        <i className="fa-solid fa-star"></i>Favourited
      </NavLink>

      <NavLink to="/" onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt"></i>Sign Out
      </NavLink>

      <NavLink to={`/profiles/${currentUser?.profile_id}`}>
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink to="/signin">
        <i className="fas fa-sign-in-alt"></i>Sign In
      </NavLink>
      <NavLink to="/signup">
        <i className="fas fa-user-plus"></i>Sign Up
      </NavLink>
    </>
  );
  return (
    <Navbar bg="light" expand="md" fixed="top">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>Brick Connect</Navbar.Brand>
        </NavLink>
        {currentUser && addNewPost}
        <NavDropdown title="Category" id="basic-nav-dropdown">
          <NavDropdown.Item>
            <NavLink to="/category/full%20set%20builds">
              Full Set Builds
            </NavLink>
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item>
            <NavLink to="/category/diy%20builds">DIY Builds</NavLink>
          </NavDropdown.Item>
        </NavDropdown>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavLink to="/">
              <i className="fas fa-home"></i>Home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
