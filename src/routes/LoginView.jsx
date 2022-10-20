import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../firebase/firebase";

export const LoginView = () => {
  useEffect(() => {
    onAuthStateChanged(auth, handleUserStateChanged);
  }, []);

  const handleUserStateChanged = (user) => {
    if (user) {
      console.log(user.displayName);
    } else {
      console.log("No hay nadie logueado");
    }
  };
  const handleOnClick = async () => {
    const googlePovider = new GoogleAuthProvider();
    await signInWithGoogle(googlePovider);
  };

  const signInWithGoogle = async (googlePovider) => {
    try {
      const res = await signInWithPopup(auth, googlePovider);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleOnClick}>Login with Google</button>
    </div>
  );
};
