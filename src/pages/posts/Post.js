import React, { useState } from "react";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link, useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";

import Avatar from "../../components/Avatar";
import { EditDeleteDropdown } from "../../components/EditDeleteDropdown";

import toast from "react-hot-toast";
import ModalConfirmation from "../../components/ModalConfirmation";

import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Badge from "react-bootstrap/Badge";
import Media from "react-bootstrap/Media";
import styles from "../../styles/Post.module.css";

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

  // Map each word to camelCase unless its equal to diy then use uppercase
  // I used the link below to help with camelcase
  // https://www.geeksforgeeks.org/how-to-convert-string-to-camel-case-in-javascript/
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

  // Used to show the modal
  const handleShowModal = () => {
    setShowModal(true);
  };

  // Used to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to send user to the edit post page with the seleced id
  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  // Function to delete a post with the seleced id
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      handleCloseModal();
      history.push("/");
      toast.success("Post successfully deleted!");
    } catch (err) {
      // console.log(err);
      toast.error("Oops, something went wrong. Please try again.");
    }
  };

  // Function to handle post like by using the post id and adding a like id
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
      // console.log(err);
    }
  };

  // Function to handle post unlike by removing the like id
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
      // console.log(err);
    }
  };

  // Function to handle adding favourite by using the post id and adding a favourite id
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
      // console.log(err);
    }
  };

  // Function to handle removing a favourite by removing the favourite id
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
      // console.log(err);
    }
  };

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`} className={styles.links}>
            <Avatar src={profile_image} height={50} />
            {owner}
            <small>
              <div className="ml-2 mt-1">Posted on: {updated_at}</div>
            </small>
          </Link>
          <div className="d-flex align-items-center">
            {category && (
              <h3>
                {/* Uses the camelcase function with the post pills */}
                <Badge className={styles.categoryBadge} pill>
                  {camelcase(category)}
                </Badge>
              </h3>
            )}
            {is_owner && postPage && (
              <EditDeleteDropdown
                handleEdit={handleEdit}
                handleDelete={handleShowModal}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <hr className={`${styles.customHr} mb-0`} />
        <Card.Img src={image} alt={title} />
        <hr className={`${styles.customHr} mt-0`} />
      </Link>
      <Card.Body>
        <div>
          <div className={styles.iconsLeft}>
            {is_owner ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You can&apos;t like your own post!</Tooltip>}
              >
                <i className={`far fa-heart mr-4 ${styles.Icon}`} />
              </OverlayTrigger>
            ) : like_id ? (
              <span onClick={handleUnlike}>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Unlike</Tooltip>}
                  aria-label="Unlike"
                >
                  <i className={`fas fa-heart mr-4 ${styles.Icon}`} />
                </OverlayTrigger>
              </span>
            ) : currentUser ? (
              <span onClick={handleLike}>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Like</Tooltip>}
                  aria-label="Like"
                >
                  <i className={`far fa-heart mr-4 ${styles.Icon}`} />
                </OverlayTrigger>
              </span>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Sign in to like posts!</Tooltip>}
              >
                <i className={`far fa-heart mr-4 ${styles.Icon}`} />
              </OverlayTrigger>
            )}
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Sign in to make a comment!</Tooltip>}
            >
              <Link to={`/posts/${id}`} aria-label="Comments Icon">
                <i className={`far fa-comments mr-4 ${styles.Icon}`} />
              </Link>
            </OverlayTrigger>
            {!is_owner && currentUser ? (
              <>
                {favourite_id ? (
                  <span onClick={handleRemoveFavourite}>
                    <i className={`fa-solid fa-star ${styles.Icon}`} />
                  </span>
                ) : (
                  <span onClick={handleFavourite}>
                    <i className={`fa-regular fa-star ${styles.Icon}`} />
                  </span>
                )}
              </>
            ) : null}
          </div>
        </div>
        {title && <Card.Title className="text-left mt-4">{title}</Card.Title>}
        <hr className={styles.customHr} />
        {description && (
          <Card.Text className="text-left">{description}</Card.Text>
        )}
        {/* Displays comment count and like count differently depending on the count*/}
        <Card.Text>
          {likes_count === 1
            ? `${likes_count} Like | `
            : `${likes_count} Likes | `}
          <Link className={styles.links} to={`/posts/${id}`}>
            {comments_count === 0
              ? "No comments yet"
              : comments_count === 1
              ? `View ${comments_count} Comment`
              : `View all ${comments_count} Comments`}
          </Link>
        </Card.Text>
      </Card.Body>
      {/* Modal to confirm deletion */}
      <ModalConfirmation
        handleMethod={handleDelete}
        show={showModal}
        setShow={setShowModal}
        body="Are you sure you want to delete your post?"
      />
    </Card>
  );
};

export default Post;
