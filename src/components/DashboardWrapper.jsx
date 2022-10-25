import React from "react";
import { Link } from "react-router-dom";

export const DashboardWrapper = ({ children }) => {
  return (
    <div>
      <nav>
        <div>Logo</div>
        <Link to="/dashboard">Links</Link>
        <Link to="/dashboard/profile">Perfil</Link>
        <Link to="/signout">Cerrar Sesión</Link>
      </nav>
      <div> {children}</div>
    </div>
  );
};
