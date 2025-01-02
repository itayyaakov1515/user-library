"use client";
import React, { useState, useEffect } from "react";
import { fetchUsers } from "@/services/requests";
import UserCard from "@/components/UserCard";
import EditUserModal from "@/components/EditUserModal";
import "./css/home.css";

const Home = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error setting users:", error);
      }
    };
    getUsers();
  }, []);

  const sortedUsers = [...users].sort((a, b) => {
    // const nameA = a.name.first.toLowerCase();
    // const nameB = b.name.first.toLowerCase();
    // if (nameA < nameB) return -1;
    // if (nameA > nameB) return 1;
    // return 0;
  });

  const handleEdit = (user: any) => {
    setSelectedUser(user);
  };

  const handleSave = (updatedUser: any) => {
    const updatedUsers = users.map((user) =>
      user.login.uuid === updatedUser.login.uuid ? updatedUser : user
    );
    setUsers(updatedUsers);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="main-container">
      <div className="content-container">
        <h1 className="title">User Library App</h1>
        <div className="user-cards">
          {sortedUsers.map((user) => (
            <div key={user.login.uuid} className="user-card-container">
              <UserCard user={user} onEdit={() => handleEdit(user)} />
            </div>
          ))}
        </div>
        {selectedUser && (
          <EditUserModal
            user={selectedUser}
            onClose={handleCloseModal}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
