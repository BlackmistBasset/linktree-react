import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

export const DashboardWrapper = ({ children }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const handleUserLoggedIn = async (user) => {
    setUsername(user.username);
  };
  const handleUserNotRegistered = (user) => {
    navigate("/login");
  };

  const handleUserNotLoggedIn = () => {
    navigate("/login");
  };
  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
    >
      <div className="container">
        <nav className="nav">
          <div className="logo">Linktree ✍️</div>
          <div>
            <Link className="navLink" to="/dashboard">
              Links
            </Link>
            <Link className="navLink" to="/dashboard/profile">
              Editar perfil
            </Link>
            <Link className="navLink" to={`/${username}`}>
              Mi perfil
            </Link>
            <Link className="navLink" to="/signout">
              Cerrar Sesión
            </Link>
          </div>
        </nav>
        <div className="body-container"> {children}</div>
      </div>
    </AuthProvider>
  );
};
