import React, { useState } from "react";

import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { setTokenTimestamp } from "../../utils/utils";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import signInImage from "../../assets/lego-group.jpg";

import toast from "react-hot-toast";
import { useRedirect } from "../../hooks/useRedirect";

function SignInForm() {
  const setCurrentUser = useSetCurrentUser();
  useRedirect("loggedIn");
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      history.goBack();
      toast.success(`Welcome ${data.user.username}!`);
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
              <h2 className="mt-3">Welcome back to Brick Connect!</h2>
              <h3 className="mt-3">Sign in</h3>
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username">
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
              <Form.Group controlId="password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  aria-label="Enter password"
                />
              </Form.Group>
              {errors.password?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <Row className="justify-content-center">
                <Button
                  className={`${btnStyles.Button} ${btnStyles.BabyBlueButtonCustom} ${btnStyles.BabyBlue}`}
                  type="submit"
                >
                  Sign In
                </Button>
              </Row>
              {errors.non_field_errors?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
            </Form>
            <Row className="justify-content-center mt-3">
              <p>
                <strong>Don&apos;t have an account?</strong>{" "}
                <Link to="/signup" className={styles.SignupLink}>
                  Sign up here
                </Link>
              </p>
            </Row>
          </Col>
          <Col md={6} className={styles.ImageCol}>
            <Image
              src={signInImage}
              alt="sign in form image"
              className="img-fluid"
              thumbnail
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SignInForm;
