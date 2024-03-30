import React, { useState } from "react";

import { Link } from "react-router-dom";
import { EditDeleteDropdown } from "../../components/EditDeleteDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";

import CommentEditForm from "./CommentEditForm";
import styles from "../../styles/Comment.module.css";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import ModalConfirmation from "../../components/ModalConfirmation";
import toast from "react-hot-toast";
import Avatar from "../../components/Avatar";

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
    commentlike_count,
    commentlike_id,
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

  // Handles the addition of a comment like and adds 1 to the count
  
  const handleCommentLike = async () => {
    try {
      const { data } = await axiosRes.post("/commentlike/", { comment: id });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                commentlike_count: comment.commentlike_count + 1,
                commentlike_id: data.id,
              }
            : comment;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  // Handles the deletion of a comment like and reduces the count by 1

  const handleCommentUnlike = async () => {
    try {
      await axiosRes.delete(`/commentlike/${commentlike_id}/`);
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                commentlike_count: comment.commentlike_count - 1,
                commentlike_id: null,
              }
            : comment;
        }),
      }));
    } catch (err) {
      // console.log(err);
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
      toast.success("Comment successfully deleted!");
      // Removes the comment from the page
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {
      // console.log(err)
    }
  };

  return (
    <>
      <hr />
      <Media>
        {/*Comment owner Avatar name and date the comment was made */}
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          <hr className={styles.customHr} />
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
            <strong>
              <p>{content}</p>
            </strong>
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
      {/* Handling the comment like heart when they are clicked */}
      {is_owner ? (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>You can&apos;t like your own comment!</Tooltip>}
        >
          <i className={`far fa-heart mr-4 ${styles.Icon}`} />
        </OverlayTrigger>
      ) : commentlike_id ? (
        <span onClick={handleCommentUnlike}>
          <i className={`fas fa-heart ${styles.Icon}`} />
        </span>
      ) : currentUser ? (
        <span onClick={handleCommentLike}>
          <i className={`far fa-heart ${styles.Icon}`} />
        </span>
      ) : (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Log in to like comments!</Tooltip>}
        >
          <i className={`far fa-heart ${styles.Icon}`} />
        </OverlayTrigger>
      )}
      {commentlike_count}
      {/* Modal to confirm deletion */}
      <ModalConfirmation
        show={showModal}
        setShow={setShowModal}
        handleMethod={handleDelete}
        body="Are you sure you want to delete your comment?"
      />
    </>
  );
};

export default Comment;
