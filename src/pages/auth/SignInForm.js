import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import toast from "react-hot-toast";
import signInImage from "../../assets/lego-group.jpg";
import { Col } from "react-bootstrap";
import styles from "../../styles/SignInForm.module.css";

function SignInForm() {
  const setCurrentUser = useSetCurrentUser();
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
      history.push("/");
      toast.success(`Welcome ${data.user.username}!`);
    } catch (err) {
      setErrors(err.response?.data);
      toast.error("Oops, something went wrong. Please try again.");
    }
  };
  return (
    <div className={styles.background}>
      <Container className={styles.container}>
        <Row className="justify-content-center align-items-center">
          <Col md={6} className={styles.formCol}>
            <div className="text-center mb-4">
              <h1 className="mt-3">Sign in</h1>
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={handleChange}
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
                />
              </Form.Group>
              {errors.password?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <Button type="submit">Sign In</Button>
              {errors.non_field_errors?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
            </Form>
            <Row className="justify-content-center mt-3">
              <p>
                <strong>Don't have an account?</strong> <Link to="/signup" className={styles.signupLink}>Sign up here</Link>
              </p>
            </Row>
          </Col>
          <Col md={6} className={styles.imageCol}>
            <img src={signInImage} alt="sign in" className="img-fluid" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SignInForm;
