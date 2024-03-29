import React, { useState } from "react";
import { axiosRes } from "../../api/axiosDefaults";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Avatar from "../../components/Avatar";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/Notifications.module.css";

import toast from "react-hot-toast";
import ModalConfirmation from "../../components/ModalConfirmation";

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

  //
  const handleReadStatus = async () => {
    try {
      // Send a patch request to update the read status of the notification
      await axiosRes.patch(`/notifications/${id}`, { read: !read });
      setNotifications((prevNotifications) => ({
        ...prevNotifications,
        // Update the results array by mapping through each notification
        results: prevNotifications.results.map((notifications) => {
          // If the notification id matches the id being updated,
          // update its read status to the opposite of the current value
          return notifications.id === id
            ? { ...notifications, read: !read }
            : notifications;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };
  // Function to handle the deletion of the notification
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
      // console.log(err);
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
          {/* Notification sender information */}
          <Avatar src={profileImage} height={40} />
          <Card.Text>{text}</Card.Text>
          {/* If the notification is not equal to follow, display a button to take the user to the commented post*/}
          {category !== "follow" && (
            <Button
              as={Link}
              to={`/posts/${objectId}`}
              className={`mb-2 ${btnStyles.Button} ${btnStyles.BabyBlueButtonCustom} ${btnStyles.BabyBlue}`}
            >
              Go to posts
            </Button>
          )}
        </Card.Body>
        <div className={styles.ButtonContainer}>
          <span>
            {/* Buttons to delete and handle read status*/}
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
              className={`mb-2 ${btnStyles.Button} ${btnStyles.BlackButtonCustom} ${btnStyles.Black}`}
              onClick={handleReadStatus}
            >
              Mark as unread
            </Button>
          ) : (
            <Button
              className={`mb-2 ${btnStyles.Button} ${btnStyles.BabyBlueButtonCustom} ${btnStyles.BabyBlue}`}
              onClick={handleReadStatus}
            >
              Mark as read
            </Button>
          )}
        </div>
      </Card>
      {/* Modal to confirm deletion */}
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
