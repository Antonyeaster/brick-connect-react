import React from "react";
import styles from "../styles/Avatar.module.css";

// Component used for display a Avatar image and text

const Avatar = ({ src, height = 45, text }) => {
  return (
    <span>
      <img
        className={styles.Avatar}
        src={src}
        height={height}
        width={height}
        alt="Avatar for"
      />
      {text}
    </span>
  );
};

export default Avatar;
