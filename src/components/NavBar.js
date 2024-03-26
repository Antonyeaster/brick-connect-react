import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";

import ModalConfirmation from "./ModalConfirmation";
import toast from "react-hot-toast";

import icon from "../assets/logo-bricks.png";
import Avatar from "./Avatar";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  const currentUser = useCurrentUser();

  const setCurrentUser = useSetCurrentUser();

  const history = useHistory();

  const [showModal, setShowModal] = useState(false);

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

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
      removeTokenTimestamp();
      handleCloseModal();
      history.push('/signin');
      toast.success("You've signed out successfully!");
    } catch (err) {
      // console.log(err);
    }
  };

  const addNewPost = (
    <NavLink
      to="/posts/create"
      className={styles.NavLink}
      activeClassName={styles.Active}
      aria-label="Add Post"
    >
      <i className="fa-solid fa-square-plus"></i>Add Post
    </NavLink>
  );

  const loggedInIcons = (
    <>
      {currentUser && (
        <>
          <Dropdown>
            <Dropdown.Toggle
              className={`${styles.DropdownToggle} ${styles.NavDropdownCustom} ml-2`}
              id="dropdown-basic"
              aria-label="Dropdown toggle for Feeds"
            >
              <i className="fas fa-stream"></i> Feeds
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item to="/feed" as={NavLink} aria-label="Feed">
                <i className="fas fa-stream"></i> Feed
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/liked" aria-label="Liked">
                <i className="fas fa-heart"></i> Liked
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/favourited" aria-label="Favourited">
                <i className="fa-solid fa-star"></i> Favourited
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle
              className={`${styles.DropdownToggle} ${styles.NavDropdownCustom} ml-2`}
              id="dropdown-basic"
              aria-label="Dropdown toggle for Category"
            >
              <i className="fa-solid fa-layer-group"></i> Category
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} to="/category/full%20set%20builds" aria-label="Full Set Builds">
                Full Set Builds
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/category/diy%20builds" aria-label="DIY Builds">
                DIY Builds
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      )}

      <NavLink
        to="/notifications"
        className={`${styles.NavLink} ml-2`}
        activeClassName={styles.Active}
        aria-label="Notifications"
      >
        <i className="fa-solid fa-envelope" /> Notifications
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

      <NavLink
        to="/"
        onClick={handleShowModal}
        className={`${styles.NavLink} ml-2`}
        aria-label="Sign Out"
      >
        <i className="fas fa-sign-out-alt"></i> Sign Out
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink
        to="/signin"
        className={`${styles.NavLink} ml-2`}
        activeClassName={styles.Active}
        aria-label="Sign in"
      >
        <i className="fas fa-sign-in-alt"></i> Sign In
      </NavLink>
      <NavLink
        to="/signup"
        className={`${styles.NavLink} ml-2`}
        activeClassName={styles.Active}
        aria-label="Sign up"
      >
        <i className="fas fa-user-plus"></i> Sign Up
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      expand="lg"
      fixed="top"
      className={styles.NavBar}
    >
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            Brick
            <img src={icon} alt="icon" height="20" />
            Connect
          </Navbar.Brand>
        </NavLink>

        {currentUser && addNewPost}
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              to="/"
              className={`${styles.NavLink} ml-2`}
              activeClassName={styles.Active}
              aria-label="Home"
            >
              <i className="fas fa-home"></i> Home
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
