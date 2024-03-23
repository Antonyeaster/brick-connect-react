import React, { useState } from "react";
import { axiosRes } from "../../api/axiosDefaults";
import { Button, Card } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import toast from "react-hot-toast";
import ModalConfirmation from "../../components/ModalConfirmation";
import { Link } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/Notifications.module.css";

const Notifications = (props) => {
  const {
    id,
    created_at: createdAt,
    profile_image: profileImage,
    object_id: objectId,
    category,
    read,
    text,
    setNotifications,
  } = props;

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleReadStatus = async () => {
    try {
      await axiosRes.patch(`/notifications/${id}`, { read: !read });
      setNotifications((prevNotifications) => ({
        ...prevNotifications,
        results: prevNotifications.results.map((notifications) => {
          return notifications.id === id
            ? { ...notifications, read: !read }
            : notifications;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/notifications/${id}`);
      setNotifications((prevNotifications) => ({
        ...prevNotifications,
        results: prevNotifications.results.filter(
          (notifications) => notifications.id !== id
        ),
      }));
    } catch (err) {
      console.log(err);
    } finally {
      toast.success("Notification deleted.");
    }
  };

  return (
    <>
      <Card className="mb-3">
        <div className="d-flex align-items-center">
          {!read && <div className={styles.Dot} />}
          <small className="pl-2 pt-2">{createdAt}</small>
        </div>
        <Card.Body>
          <Avatar src={profileImage} height={40} />
          <Card.Text>{text}</Card.Text>
          {category !== "follow" && (
            <Button
              as={Link}
              to={`/posts/${objectId}`}
              className={`mb-2 ${btnStyles.Button} ${styles.ReadButtonCustom} ${btnStyles.BabyBlue}`}
            >
              Go to posts
            </Button>
          )}
        </Card.Body>
        <div className={styles.ButtonContainer}>
          <span>
            <Button
              className={`btn-danger mb-2 ${btnStyles.Button}`}
              aria-label="Delete notification"
              title="Delete Notification"
              onClick={handleShowModal}
            >
              <i className="fas fa-trash-alt" />
            </Button>
          </span>
          {read ? (
            <Button
              className={`mb-2 ${btnStyles.Button} ${styles.UnreadButtonCustom} ${btnStyles.Grey}`}
              onClick={handleReadStatus}
            >
              Mark as unread
            </Button>
          ) : (
            <Button
              className={`mb-2 ${btnStyles.Button} ${styles.ReadButtonCustom} ${btnStyles.BabyBlue}`}
              onClick={handleReadStatus}
            >
              Mark as read
            </Button>
          )}
        </div>
      </Card>
      <ModalConfirmation
        show={showModal}
        setShow={setShowModal}
        handleMethod={handleDelete}
        body="Delete notification!"
      />
    </>
  );
};

export default Notifications;
