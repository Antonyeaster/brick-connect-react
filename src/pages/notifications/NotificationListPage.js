import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { axiosReq } from "../../api/axiosDefaults";
import { fetchMoreData } from "../../utils/utils";

import NotFound from "../../components/NotFound";
import Notifications from "./Notification";
import Asset from "../../components/Asset";
import styles from "../../styles/Notifications.module.css";

const NotificationListPage = ({ notificationMessage }) => {
  const [notifications, setNotifications] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axiosReq.get(`/notifications/`);
        setNotifications(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    setHasLoaded(false);
    const searchTimer = setTimeout(() => {
      fetchNotifications();
    }, 1000);
    return () => {
      clearTimeout(searchTimer);
    };
  }, []);

  return !currentUser ? (
    <NotFound />
  ) : (
    <div className={styles.Container}>
      <h3 className={styles.Heading}>Notifications</h3>
      {hasLoaded ? (
        notifications.results.length ? (
          <InfiniteScroll
            children={notifications.results.map((notifications) => (
              <Notifications
                key={notifications.id}
                {...notifications}
                setNotifications={setNotifications}
                notificationMessage={notificationMessage}
              />
            ))}
            dataLength={notifications.results.length}
            loader={<Asset spinner />}
            hasMore={!!notifications.next}
            next={() => fetchMoreData(notifications, setNotifications)}
          />
        ) : (
          <p>No new notifications</p>
        )
      ) : (
        <Asset spinner />
      )}
    </div>
  );
};

export default NotificationListPage;
