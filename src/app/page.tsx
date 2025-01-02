"use client";

import React, { useEffect, useState } from "react";
import { fetchUsers } from "@/services/requests";
import UserCard from "@/components/UserCard";

const Home = () => {
  const [users, setUsers] = useState<any[]>([]);

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

  return (
    <div style={{ padding: "16px" }}>
      <h1>User Library App</h1>
      {users.map((user) => (
        <UserCard key={user.login.uuid} user={user} />
      ))}
    </div>
  );
};

export default Home;
