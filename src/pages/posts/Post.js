import React, { useState } from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
  Badge,
  Button,
  Card,
  Media,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { EditDeleteDropdown } from "../../components/EditDeleteDropdown";
import toast from "react-hot-toast";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    title,
    description,
    image,
    updated_at,
    postPage,
    favourite_id,
    setPosts,
    category,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const camelcase = (str) => {
    return str
      .split(" ")
      .map((category) => {
        if (category.toLowerCase() === "diy") {
          return "DIY";
        } else {
          return category.charAt(0).toUpperCase() + category.slice(1);
        }
      })
      .join(" ");
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      handleCloseModal();
      history.push("/");
      toast.success("Post successfully deleted!");
    } catch (err) {
      console.log(err);
      toast.error("Oops, something went wrong. Please try again.");
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleFavourite = async () => {
    try {
      const { data } = await axiosRes.post("/favourites/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? {
                ...post,
                favourite_id: data.id,
              }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveFavourite = async () => {
    try {
      await axiosRes.delete(`/favourites/${favourite_id}/`);
      setPosts((prevPost) => ({
        ...prevPost,
        results: prevPost.results.map((post) => {
          return post.id === id
            ? {
                ...post,
                favourite_id: null,
              }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && postPage && (
              <EditDeleteDropdown
                handleEdit={handleEdit}
                handleDelete={handleShowModal}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      {category && (
        <h3>
          <Badge pill variant="success">
            {camelcase(category)}
          </Badge>
        </h3>
      )}
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        <div className={styles.PostBar}>
          <div className={styles.iconsLeft}>
            {is_owner ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You can't like your own post!</Tooltip>}
              >
                <i className="far fa-heart mr-2" />
              </OverlayTrigger>
            ) : like_id ? (
              <span onClick={handleUnlike}>
                <i className={`fas fa-heart ${styles.Icon}`} />
              </span>
            ) : currentUser ? (
              <span onClick={handleLike}>
                <i className={`far fa-heart ${styles.IconOutline}`} />
              </span>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Log in to like posts!</Tooltip>}
              >
                <i className="far fa-heart mr-2" />
              </OverlayTrigger>
            )}
            <Link to={`/posts/${id}`}>
              <i className="far fa-comments mr-2" />
            </Link>
            {!is_owner && currentUser ? (
              <>
                {favourite_id ? (
                  <span onClick={handleRemoveFavourite}>
                    <i className={`fa-solid fa-star ${styles.Icon}`} />
                  </span>
                ) : (
                  <span onClick={handleFavourite}>
                    <i className={`fa-regular fa-star ${styles.IconOutline}`} />
                  </span>
                )}
              </>
            ) : null}
          </div>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete your post?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        {title && <Card.Title className="text-left mt-3">{title}</Card.Title>}
        <hr className={styles.customHr} />
        {description && (
          <Card.Text className="text-left">{description}</Card.Text>
        )}
        <Card.Text>
          {likes_count === 1
            ? `${likes_count} Like | `
            : `${likes_count} Likes | `}
            <Link className={styles.CommentCount} to={`/posts/${id}`}>
          {comments_count === 1
            ? `${comments_count} Comment`
            : `${comments_count} Comments`}
            </Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Post;
