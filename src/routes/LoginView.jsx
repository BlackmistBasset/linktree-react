import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, userExists } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export const LoginView = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  // state:
  // 0: inicializado
  //1: loading
  //2: login completo
  //3: login pero sin registro
  //4: no hay nadie logueado
  const [state, setCurrentState] = useState(0);
  useEffect(() => {
    setCurrentState(1);
    onAuthStateChanged(auth, handleUserStateChanged);
  }, []);

  const handleUserStateChanged = async (user) => {
    if (user) {
      const isRegistered = await userExists(user.uid);
      if (isRegistered) {
        navigate("/dashboard");
        setCurrentState(2);
      } else {
        navigate("/register");
        setCurrentState(3);
        console.log(user.displayName);
      }
    } else {
      setCurrentState(4);
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

  if (state === 2) {
    return <div>Autenticado y registrado</div>;
  } else if (state === 3) {
    return <div>Autenticado pero no registrado</div>;
  } else if (state === 4) {
    return (
      <div>
        <button onClick={handleOnClick}>Login with Google</button>
      </div>
    );
  }
  return <div>Loading...</div>;
};
