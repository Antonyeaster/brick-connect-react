import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import axios from "axios";

const NavBar = () => {
  const currentUser = useCurrentUser();

  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post('dj-rest-auth/logout/');
      setCurrentUser(null)
    } catch (err) {
      console.log(err)
    }
  }
  const addNewPost = (
    <NavLink to="/posts/create">
      <i className="fa-solid fa-square-plus"></i>Add Post
    </NavLink>
  );
  const loggedInIcons = (
    <>
      <NavLink to="/" onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt"></i>Sign Out
      </NavLink>
      <NavLink to={`/profiles/${currentUser?.profile_id}`}>
        <img src={currentUser?.profile_image} />
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
        <Navbar.Brand href="#home">Brick Connect</Navbar.Brand>
        {currentUser && addNewPost}
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
