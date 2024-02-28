import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/EditDeleteDropdown.module.css";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const TreeDots = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fas fa-ellipsis"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

export const EditDeleteDropdown = ({handleEdit, handleDelete}) => {
  return (
    <Dropdown className="ml-auto" drop="left">
      <Dropdown.Toggle
        as={TreeDots}
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
  );
};
