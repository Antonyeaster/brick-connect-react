import React, { useState } from "react";
import { axiosRes } from "../../api/axiosDefaults";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import toast from "react-hot-toast";
import ModalConfirmation from "../../components/ModalConfirmation";

const Notifications = (props) => {
  const {
    id,
    created_at: createdAt,
    profile_image: profileImage,
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
      <Card>
      <small className="">{createdAt}</small>
        <span>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Clear Notification</Tooltip>}
          >
            <span
              aria-label="Clear notification"
              title="Clear Notification"
              onClick={handleShowModal}
            >
              <i className="fas fa-trash-alt" />
            </span>
          </OverlayTrigger>
          {read ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Mark as unread</Tooltip>}
            >
              <span onClick={handleReadStatus}>
                <i className="fa-solid fa-circle-check" />
              </span>
            </OverlayTrigger>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Mark as read</Tooltip>}
            >
              <span onClick={handleReadStatus}>
                <i className="fa-regular fa-circle-check" />
              </span>
            </OverlayTrigger>
          )}
        </span>
        <Card.Body>
          <Card.Text>
            <Avatar src={profileImage} height={30} /> {text}
          </Card.Text>
        </Card.Body>
      </Card>
      <ModalConfirmation
        show={showModal}
        setShow={setShowModal}
        handleMethod={handleDelete}
        body="Clear notification!"
      />
    </>
  );
};
