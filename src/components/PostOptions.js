import styles from "../styles/PostOptions.module.css";
import React from "react"
import Dropdown from "react-bootstrap/Dropdown";
import { render } from "react-dom";
import { useNavigate } from "react-router-dom";


const OwnerSettings = React.forwardRef(({ onClick }, ref) => (
    <i
      className="fas fa-ellipsis-v"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
  ));
export const PostOptions = ({ handleEdit, handleDelete }) => {
    return (
        <Dropdown className="ml-auto" drop="left">
        <Dropdown.Toggle as={OwnerSettings} />

        <Dropdown.Menu
            className="text-center"
            popperConfig={{ strategy: "fixed" }}
        >
            <Dropdown.Item
            className={styles.DropdownItem}
            onClick={handleEdit}
            aria-label="edit"
            >
            <i className="fas fa-edit" />
            <p>Edit</p>
            </Dropdown.Item>
            <Dropdown.Item
            className={styles.DropdownItem}
            onClick={handleDelete}
            aria-label="delete"
            >
            <i className="fas fa-trash-alt" />
            <p>Delete</p>
            </Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
    );
};

export function ProfileEditDropdown({id}) {
  const navigate = useNavigate()
  return (
    <Dropdown className="ml-auto" drop="left">
        <Dropdown.Toggle as={OwnerSettings} />

        <Dropdown.Menu
            className="text-center"
            popperConfig={{ strategy: "fixed" }}
        >
            <Dropdown.Item
            className={styles.DropdownItem}
            onClick={() => navigate(`profiles/${id}/edit`)}
            aria-label="edit-profile"
            >
            <i className="fas fa-edit" />
            <p>Edit</p>
            </Dropdown.Item>
            <Dropdown.Item
            className={styles.DropdownItem}
            onClick={() => navigate(`/profiles/${id}/edit/username`)}
            aria-label="edit-username"
            >
            <i className="fas fa-edit" />
            <p>Edit Username</p>
            </Dropdown.Item>
            <Dropdown.Item
            className={styles.DropdownItem}
            onClick={() => navigate(`/profiles/${id}/edit/password`)}
            aria-label="edit-password"
            >
            <i className="fas fa-key" />
            <p>Edit Password</p>
            </Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
  )
}
  
