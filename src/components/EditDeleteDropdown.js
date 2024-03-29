import React from "react";

import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/EditDeleteDropdown.module.css";
import { useHistory } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <i
    className={`${styles.DropdownIcon} px-2 fa-solid fa-ellipsis-vertical`}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

// Component for rendering a dropdown with more options.

ThreeDots.displayName = "ThreeDots";

export const EditDeleteDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <OverlayTrigger placement="bottom" overlay={<Tooltip>Edit</Tooltip>}>
      <Dropdown className="ml-auto mr-2" drop="left">
        <Dropdown.Toggle
          as={ThreeDots}
          id="dropdown-custom-components"
        ></Dropdown.Toggle>

        <Dropdown.Menu
          popperConfig={{ strategy: "fixed" }}
          className="text-center"
        >
          <Dropdown.Item
            className={styles.DropdownItem}
            onClick={handleEdit}
            aria-label="edit"
          >
            <p>Edit</p>
            <i className="fas fa-edit" />
          </Dropdown.Item>
          <Dropdown.Item
            className={styles.DropdownItem}
            onClick={handleDelete}
            aria-label="delete"
          >
            <p>Delete</p>
            <i className="fas fa-trash-alt" />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </OverlayTrigger>
  );
};

// Specifically for profile dropdown

export function ProfileEditDropdown({ id }) {
  const history = useHistory();

  return (
    <OverlayTrigger placement="bottom" overlay={<Tooltip>Edit</Tooltip>}>
      <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
        <Dropdown.Toggle as={ThreeDots} />
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => history.push(`/profiles/${id}/edit`)}
            aria-label="edit-profile"
          >
            <i className="fas fa-edit" /> edit profile
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => history.push(`/profiles/${id}/edit/username`)}
            aria-label="edit-username"
          >
            <i className="far fa-id-card" /> change username
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => history.push(`/profiles/${id}/edit/password`)}
            aria-label="edit-password"
          >
            <i className="fas fa-key" /> change password
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </OverlayTrigger>
  );
}
