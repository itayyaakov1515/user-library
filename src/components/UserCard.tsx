import React from "react";

interface UserCardProps {
  user: {
    name: {
      title: string;
      first: string;
      last: string;
    };
    email: string;
    location: {
      country: string;
      city: string;
      street: {
        name: string;
        number: number;
      };
    };
    picture: {
      medium: string;
    };
  };
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "16px",
        maxWidth: "400px",
      }}>
      <img
        src={user.picture.medium}
        alt={`${user.name.first} ${user.name.last}`}
        style={{ borderRadius: "50%", marginBottom: "8px" }}
      />
      <h2>
        {user.name.title} {user.name.first} {user.name.last}
      </h2>
      <p>Email: {user.email}</p>
      <p>
        Location: {user.location.street.number} {user.location.street.name},{" "}
        {user.location.city}, {user.location.country}
      </p>
    </div>
  );
};

export default UserCard;
