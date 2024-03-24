import React from "react";
import { NavLink } from "react-router-dom";

import NoResults from "../assets/no-results.png";
import Asset from "./Asset";

import styles from "../styles/NotFound.module.css";
import btnStyles from "../styles/Button.module.css";

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
