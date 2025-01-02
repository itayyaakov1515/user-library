import React, { useState } from "react";
import Button from "./Button"; // Import the Button component
import { User } from "@/types/User";
import "../app/css/UserCard.css"; // Import the CSS file
import "font-awesome/css/font-awesome.min.css";
import ConfirmationModal from "./Modal";

interface UserCardProps {
  user: User;
  onEdit: () => void;
  onDelete: (user: User) => void; 
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDeleteClick = () => {
    setIsModalVisible(true); 
  };

  const handleConfirmDelete = () => {
    onDelete(user); 
    setIsModalVisible(false); 
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false); 
  };

  return (
    <div className="user-card">
      <div className="user-card-header">
        <i
          className="fa fa-times delete-icon"
          onClick={handleDeleteClick}
          style={{ cursor: "pointer" }}
        />
        <p className="user-id">ID: {user.login.uuid}</p>
        <div className="user-image-container">
          <img
            src={user.picture.medium}
            alt={`${user.name.first} ${user.name.last}`}
            className="user-image"
          />
        </div>
      </div>

      <div className="user-card-body">
        <h2 className="user-name">
          {user.name.title} {user.name.first} {user.name.last}
        </h2>

        <p className="user-email">
          Email: <span>{user.email}</span>
        </p>

        <p className="user-location">
          Location:{" "}
          <span>
            {user.location.city}, {user.location.country}
          </span>
        </p>
      </div>

      <div className="user-card-footer">
        <Button text="Edit" onClick={onEdit} color="green" size="medium" />
      </div>

      {isModalVisible && (
        <ConfirmationModal
          action="delete this user"
          text={`Are you sure you want to delete ${user.name.first} ${user.name.last}?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default UserCard;
