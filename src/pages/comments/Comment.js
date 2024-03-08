import React, { useState } from "react";
import CommentEditForm from "./CommentEditForm";
import styles from "../../styles/Comment.module.css";
import { Button, Media, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { EditDeleteDropdown } from "../../components/EditDeleteDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setPost,
    setComments,
    commentLikeCount,
    commentLike_id,
  } = props;

  // Toggles the edit form, set to false until
  // requested then the state changes to true
  const [showEditForm, setShowEditForm] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const currentUser = useCurrentUser();
  // Checking current user is post owner
  const is_owner = currentUser?.username === owner;

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCommentLike = async () => {
    try {
      const { data } = await axiosRes.post("/commentlike/", { comment: id });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                commentLikeCount: comment.commentLikeCount + 1,
                commentLike_id: data.id,
              }
            : comment;
        }),
      }));
    } catch (err) {
      console.log("Error liking comment");
    }
  };

  // Delete comment function
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setPost((prevPost) => ({
        // reduces comment count by 1
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));
      handleCloseModal();
      // Removes the comment from the page
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {}
  };

  return (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          {showEditForm ? (
            <CommentEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{content}</p>
          )}
        </Media.Body>
        {is_owner && !showEditForm && (
          // Displays the icons for edit and delete,
          // if edit is clicked the setShowEditForm state
          // changes to true
          <EditDeleteDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleShowModal}
          />
        )}
      </Media>
      {is_owner ? (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>You can't like your own comment!</Tooltip>}
        >
          <i className="far fa-heart" />
        </OverlayTrigger>
      ) : commentLike_id ? (
        <span onClick={() => {}}>
          <i className={`fas fa-heart ${styles.Icon}`} />
        </span>
      ) : currentUser ? (
        <span onClick={handleCommentLike}>
          <i className={`far fa-heart ${styles.IconOutline}`} />
        </span>
      ) : (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Log in to like comments!</Tooltip>}
        >
          <i className="far fa-heart" />
        </OverlayTrigger>
      )}
      {commentLikeCount}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your comment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Comment;
