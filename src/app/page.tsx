"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "@/components/UserCard";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=10")
      .then((response) => {
        setUsers(response.data.results);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div style={{ padding: "16px" }}>
      <h1>User Library App</h1>
      {users.map((user) => (
        <UserCard user={user} />
      ))}
    </div>
  );
};

export default Home;
