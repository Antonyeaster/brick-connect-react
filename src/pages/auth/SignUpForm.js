import React, { useState } from "react";

import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import formImage from "../../assets/lego-group.jpg";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";

import toast from "react-hot-toast";
import { useRedirect } from "../../hooks/useRedirect";

// Create the sign up form with username and password1 and password2 fields

const SignUpForm = () => {
  useRedirect("loggedIn");
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  // This function makes a post request to Sign up once the user submits the form

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
      toast.success("You've signed up successfully! Please sign in");
    } catch (err) {
      setErrors(err.response?.data);
      toast.error("Oops, something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.Background}>
      <Container className={styles.Container}>
        <Row className="justify-content-center align-items-center">
          <Col md={6} className={styles.FormCol}>
            <div className="text-center mb-4">
              <h2 className="mt-3">Welcome to Brick Connect!</h2>
              <h3 className="mt-3">Sign Up</h3>
            </div>
            <Form onSubmit={handleSubmit}>
              {/* Username */}
              <Form.Group controlId="username">
                <Form.Label className="d-none">Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  aria-label="Enter username"
                />
              </Form.Group>
              {errors.username?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              <Form.Group controlId="password1">
                {/* Password */}
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password1"
                  value={password1}
                  onChange={handleChange}
                  aria-label="Enter password"
                />
              </Form.Group>
              {errors.password1?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <Form.Group controlId="password2">
                {/* Password confirm */}
                <Form.Label className="d-none">Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={handleChange}
                  aria-label="Enter password again"
                />
              </Form.Group>
              {errors.password2?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <Row className="justify-content-center">
                {/* Sign up button */}
                <Button
                  className={`${btnStyles.Button} ${btnStyles.BabyBlueButtonCustom} ${btnStyles.BabyBlue}`}
                  type="submit"
                >
                  Sign Up
                </Button>
              </Row>
              {errors.non_field_errors?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
            </Form>
            {/* Sign in link */}
            <Row className="justify-content-center mt-3">
              <p>
                <strong>Already have an account?</strong>{" "}
                <Link to="/signin" className={styles.SignupLink}>
                  Sign in here
                </Link>
              </p>
            </Row>
          </Col>
          {/* Image */}
          <Col md={6} className={styles.ImageCol}>
            <Image
              src={formImage}
              alt="sign up form image"
              className="img-fluid"
              thumbnail
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUpForm;
