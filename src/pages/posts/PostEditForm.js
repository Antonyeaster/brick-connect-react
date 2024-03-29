import React, { useEffect, useRef, useState } from "react";

import { useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

import toast from "react-hot-toast";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import btnStyles from "../../styles/Button.module.css";

function PostEditForm() {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
  });

  const { title, description, image, category } = postData;

  // Reference to the image input element
  const imageInput = useRef(null);

  // The useHistory hook is used for navigation
  const history = useHistory();

  // The useParams hook extracts parameters from the URL.
  const { id } = useParams();

  // Use useEffect to fetch post data on component mount
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        const { title, description, image, is_owner, category } = data;

        // Check if the current user is the post owner
        // If they aren't redirect them to the home page
        is_owner
          ? setPostData({ title, description, image, category })
          : history.push("/");
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [id, history]);
  // function to handle form field changes
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };
  // Function to handle the change of the image input
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };
  // The function handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    // Append the new title, description and category if there is one to the formData
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    // If a new image is selected, append it to the FormData
    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/posts/${id}/`, formData);
      history.push(`/posts/${id}`);
      toast.success(" Post successfully edited!");
    } catch (err) {
      // console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
        toast.error("Oops, something went wrong. Please try again.");
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <h4>Update your post!</h4>
      <hr />
      <Form.Group>
        {/* Title */}
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          aria-label="Title"
        />
      </Form.Group>
      {errors.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        {/* Category */}
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          name="category"
          value={category}
          onChange={handleChange}
          aria-label="Category"
        >
          <option value="full set builds">Full Set Builds</option>
          <option value="diy builds">DIY Builds</option>
        </Form.Control>
      </Form.Group>
      {errors.category?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        {/* Description */}
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          rows={6}
          value={description}
          onChange={handleChange}
          aria-label="Description"
        />
      </Form.Group>
      {errors.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      {/* Cancel button */}
      <Button
        onClick={() => history.goBack()}
        className={`${btnStyles.Button} ${btnStyles.BlackButtonCustom} ${btnStyles.Black}`}
      >
        Cancel
      </Button>

      {/* Save button */}
      <Button
        className={`${btnStyles.Button} ${btnStyles.BabyBlueButtonCustom} ${btnStyles.BabyBlue}`}
        type="submit"
      >
        Save
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              <figure>
                <Image
                  className={`${appStyles.Image} ${styles.UploadedImage}`}
                  src={image}
                  alt="Post image"
                />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.BabyBlue} btn`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>
              {/* Input element so the user can select an image from their device */}
              <Form.File
                className={styles.ChooseImage}
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostEditForm;
