import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "../components/AuthProvider";
import { logOut } from "../firebase/firebase";
export const SignOutView = () => {
  const navigate = useNavigate();
  const handleUserLoggedIn = async (user) => {
    await logOut();
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
    />
  );
};
