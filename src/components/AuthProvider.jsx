import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  registerNewUser,
  userExists,
  getUserInfo,
} from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
export const AuthProvider = ({
  children,
  onUserLoggedIn,
  onUserNotLoggedIn,
  onUserNotRegistered,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, handleUserStateChanged);
  }, []);

  const handleUserStateChanged = async (user) => {
    if (user) {
      const isRegistered = await userExists(user.uid);
      if (isRegistered) {
        const userInfo = await getUserInfo(user.uid);
        if (userInfo.processCompleted) {
          onUserLoggedIn(userInfo);
        } else {
          onUserNotRegistered(userInfo);
        }
      } else {
        await registerNewUser({
          uid: user.uid,
          displayName: user.displayName,
          profilePicture: "",
          username: "",
          processCompleted: false,
        });
        onUserNotRegistered(user);
      }
    } else {
      onUserNotLoggedIn();
    }
  };
  return <div>{children}</div>;
};
