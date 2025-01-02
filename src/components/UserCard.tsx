import React from "react";
import Button from "./Button"; // Import the Button component
import { User } from "@/types/User";
import "../app/css/UserCard.css"; // Import the CSS file

interface UserCardProps {
  user: User;
  onEdit: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit }) => {
  return (
    <div className="user-card">
      <p className="user-id">ID: {user.login.uuid}</p>

      <div className="user-image-container">
        <img
          src={user.picture.medium}
          alt={`${user.name.first} ${user.name.last}`}
          className="user-image"
        />
      </div>

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

      <Button text="Edit" onClick={onEdit} color="green" size="medium" />
    </div>
  );
};

export default UserCard;
