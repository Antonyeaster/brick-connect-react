import React, { useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";
import Avatar from "./Avatar";
import ModalConfirmation from "./ModalConfirmation";
import toast from "react-hot-toast";
import styles from "../styles/NavBar.module.css";
import icon from "../assets/bricks.png";

const NavBar = () => {
  const currentUser = useCurrentUser();

  const setCurrentUser = useSetCurrentUser();

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      handleCloseModal();
      toast.success("You've signed out successfully!");
    } catch (err) {
      console.log(err);
    }
  };
  const addNewPost = (
    <NavLink to="/posts/create" className={styles.NavLink}>
      <i className="fa-solid fa-square-plus"></i>Add Post
    </NavLink>
  );
  const loggedInIcons = (
    <>
      <NavDropdown title="Feeds" id="feeds-dropdown" className={styles.CategoryDropDown}>
        <NavDropdown.Item as={NavLink} to="/feed" className={styles.CategoryDropDown}>
          <i className="fas fa-stream"></i>Feed
        </NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/liked" className={styles.CategoryDropDown}>
          <i className="fas fa-heart"></i>Liked
        </NavDropdown.Item>
        <NavDropdown.Item
          as={NavLink}
          to="/favourited"
          className={styles.CategoryDropDown}
        >
          <i className="fa-solid fa-star"> </i>Favourited
        </NavDropdown.Item>
      </NavDropdown>

        <NavDropdown
          title="Category"
          id="basic-nav-dropdown"
          className={styles.CategoryDropDown}
        >
          <NavDropdown.Item
            as={NavLink}
            to="/category/full%20set%20builds"
            className={styles.NavLink}
          >
            Full Set Builds
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item
            as={NavLink}
            to="/category/diy%20builds"
            className={styles.NavLink}
          >
            DIY Builds
          </NavDropdown.Item>
        </NavDropdown>

      <NavLink to="/notifications" className={styles.NavLink}>
        <i className="fa-solid fa-envelope" />
        Notifications
      </NavLink>

      <NavLink
        to={`/profiles/${currentUser?.profile_id}`}
        className={styles.NavLink}
      >
        <Avatar
          src={currentUser?.profile_image}
          text={currentUser?.username}
          height={25}
        />
      </NavLink>

      <NavLink to="/" onClick={handleShowModal} className={styles.NavLink}>
        <i className="fas fa-sign-out-alt"></i>Sign Out
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink to="/signin" className={styles.NavLink}>
        <i className="fas fa-sign-in-alt"></i>Sign In
      </NavLink>
      <NavLink to="/signup" className={styles.NavLink}>
        <i className="fas fa-user-plus"></i>Sign Up
      </NavLink>
    </>
  );
  return (
    <Navbar expand="lg" fixed="top" className={styles.NavBar}>
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            Brick
            <img src={icon} alt="icon" height="20" />
            Connect
          </Navbar.Brand>
        </NavLink>
        {currentUser && addNewPost}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink to="/" className={styles.NavLink}>
              <i className="fas fa-home"></i>Home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <ModalConfirmation
        show={showModal}
        setShow={setShowModal}
        handleMethod={handleSignOut}
        body="Are you sure you want to sign out?"
      />
    </Navbar>
  );
};

export default NavBar;
