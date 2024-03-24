import React, { useState } from "react";
import { axiosRes } from "../../api/axiosDefaults";

import Form from "react-bootstrap/Form";
import styles from "../../styles/CommentCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import toast from "react-hot-toast";

function CommentEditForm(props) {
  const { id, content, setShowEditForm, setComments } = props;

  const [formContent, setFormContent] = useState(content);

  // handles the change if the content
  // is updated in the textarea
  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  // When the form is saved the handlesubmit updates the
  // comment and changes the state of the setShowEditForm
  // back to false to hide the comment form
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(),
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: formContent.trim(),
                updated_at: "now",
              }
            : comment;
        }),
      }));
      setShowEditForm(false);
      toast.success("Comment edited successfully!");
    } catch (err) {
      // console.log(err);
      toast.error("Oops, something went wrong. Please try again.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control
          className={styles.Form}
          as="textarea"
          value={formContent}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <div className="text-right">
        <button
          className={`${btnStyles.Button} ${btnStyles.BlackButtonCustom} ${btnStyles.Black}`}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          Cancel
        </button>
        <button
          className={`${btnStyles.Button} ${btnStyles.BabyBlueButtonCustom} ${btnStyles.BabyBlue}`}
          disabled={!content.trim()}
          type="submit"
        >
          Save
        </button>
      </div>
    </Form>
  );
}

export default CommentEditForm;
