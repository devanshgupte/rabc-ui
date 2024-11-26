import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Roles from "./pages/Roles";
import Permissions from "./pages/Permissions";
import Login from "./pages/Login";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  const PrivateRoute = ({ element }) => {
    return isLoggedIn ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/"
          element={<PrivateRoute element={<Dashboard username={username} onLogout={handleLogout} />} />}
        />
        <Route path="/users" element={<PrivateRoute element={<Users />} />} />
        <Route path="/roles" element={<PrivateRoute element={<Roles />} />} />
        <Route path="/permissions" element={<PrivateRoute element={<Permissions />} />} />
      </Routes>
    </Router>
  );
};

export default App;
