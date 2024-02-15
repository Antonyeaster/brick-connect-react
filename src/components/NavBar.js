import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar bg="light" expand="md" fixed="top">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/signin">Sign In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
