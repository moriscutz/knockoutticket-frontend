import React, { useState, useEffect } from "react";
import UserCalls from "../api/UserCalls";

function App() {
  const [appUsers, setAppUsers] = useState([]);

  useEffect(() => {
    const fetchAppUsers = async () => {
      try {
        const response = await UserCalls.getAppUsers();
        const users = response.map((entry) => entry.user);
        setAppUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAppUsers();
  }, []);

  return (
    <div className="App">
      <h1>App Users</h1>
      <ul>
        {appUsers.map((user) => (
          <li key={user.id}>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>ID: {user.id}</p>
            <p>password: {user.password}</p>
            <p>userType: {user.userType}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
