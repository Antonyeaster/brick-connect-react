import React, { useState } from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
  Badge,
  Card,
  Media,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { EditDeleteDropdown } from "../../components/EditDeleteDropdown";
import toast from "react-hot-toast";
import ModalConfirmation from "../../components/ModalConfirmation";

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
    <Link to={`/profiles/${profile_id}`} className={styles.links}>
      <Avatar src={profile_image} height={50} />
      {owner}
      <small><div className="ml-4 mt-1">{updated_at}</div></small>
    </Link>
    <div className="d-flex align-items-center">
      {category && (
        <h3>
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
                overlay={<Tooltip>You can't like your own post!</Tooltip>}
              >
                <i className={`far fa-heart mr-4 ${styles.Icon}`} />
              </OverlayTrigger>
            ) : like_id ? (
              <span onClick={handleUnlike}>
                <OverlayTrigger placement="top" overlay={<Tooltip>Unlike</Tooltip>}>
                <i className={`fas fa-heart mr-4 ${styles.Icon}`} />
                </OverlayTrigger>
              </span>
            ) : currentUser ? (
              <span onClick={handleLike}>
                <OverlayTrigger placement="top" overlay={<Tooltip>Like</Tooltip>}>
                <i className={`far fa-heart mr-4 ${styles.Icon}`} />
                </OverlayTrigger>
              </span>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Log in to like posts!</Tooltip>}
              >
                <i className={`far fa-heart mr-4 ${styles.Icon}`} />
              </OverlayTrigger>
            )}
            <Link to={`/posts/${id}`}>
              <i className={`far fa-comments mr-4 ${styles.Icon}`} />
            </Link>
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
        <Card.Text>
          {likes_count === 1
            ? `${likes_count} Like | `
            : `${likes_count} Likes | `}
          <Link className={styles.links} to={`/posts/${id}`}>
            {comments_count === 1
              ? `${comments_count} Comment`
              : `${comments_count} Comments`}
          </Link>
        </Card.Text>
      </Card.Body>
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
