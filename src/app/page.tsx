"use client";
import React, { useState, useEffect } from "react";
import { fetchUsers } from "@/services/requests";
import UserCard from "@/components/UserCard";
import EditUserModal from "@/components/EditUserModal";
import AddUserModal from "@/components/AddUserModal";
import "./css/Home.css";
import Button from "@/components/Button";

const Home = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false);

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

  const sortedUsers = [...users];

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

  const handleDelete = (user: any) => {
    const updatedUsers = users.filter((u) => u.login.uuid !== user.login.uuid);
    setUsers(updatedUsers);
  };

  const handleAddUser = (newUser: any) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <div className="main-container">
      <div className="content-container">
        <h1 className="title">User Library App</h1>

        <Button
          text="Add New User"
          onClick={() => setShowAddUserModal(true)}
          color="grey"
          size="small"
        />

        <div className="user-cards">
          {sortedUsers.map((user) => (
            <div key={user.login.uuid} className="user-card-container">
              <UserCard
                user={user}
                onEdit={() => handleEdit(user)}
                onDelete={() => handleDelete(user)}
              />
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

        {showAddUserModal && (
          <AddUserModal
            onClose={() => setShowAddUserModal(false)}
            onSave={handleAddUser}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
