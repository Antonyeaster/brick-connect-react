import React from "react";
import NoResults from "../assets/no-results.png";
import styles from "../styles/NotFound.module.css";
import Asset from "./Asset";
import btnStyles from "../styles/Button.module.css";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={styles.NotFound}>
      <Asset
        src={NoResults}
        message={"Sorry, the page you're looking for doesn't exist"}
      />
      <NavLink
        to="/"
        className={`mb-2 ${btnStyles.Button} ${btnStyles.BabyBlueButtonCustom} ${btnStyles.BabyBlue}`}
      >
        Back to Home page
      </NavLink>
    </div>
  );
};

export default NotFound;