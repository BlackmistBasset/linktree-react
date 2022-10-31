import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "../../components/AuthProvider";

import style from "./LoginView.module.css";

export const LoginView = () => {
  const navigate = useNavigate();
  //const [currentUser, setCurrentUser] = useState(null);
  // state:
  // 0: inicializado
  //1: loading
  //2: login completo
  //3: login pero sin registro
  //4: no hay nadie logueado
  //5: ya existe el username
  //6: nuevo username, click para continuar
  const [state, setState] = useState(0);
  // useEffect(() => {
  //   setCurrentState(1);
  //   onAuthStateChanged(auth, handleUserStateChanged);
  // }, []);

  // const handleUserStateChanged = async (user) => {
  //   if (user) {
  //     const isRegistered = await userExists(user.uid);
  //     if (isRegistered) {
  //       navigate("/dashboard");
  //       setCurrentState(2);
  //     } else {
  //       navigate("/register");
  //       setCurrentState(3);
  //       console.log(user.displayName);
  //     }
  //   } else {
  //     setCurrentState(4);
  //     console.log("No hay nadie logueado");
  //   }
  // };
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

  const handleUserLoggedIn = (user) => {
    navigate("/dashboard");
  };

  const handleUserNotRegistered = (user) => {
    navigate("/register");
  };

  const handleUserNotLoggedIn = () => {
    setState(4);
  };

  if (state === 4) {
    return (
      <div className={style.loginView}>
        <h1>LinkTree</h1>
        <button className={style.provider} onClick={handleOnClick}>
          Login with Google
        </button>
      </div>
    );
  }
  <div>Loading...</div>;

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    >
      <div>Loading...</div>
    </AuthProvider>
  );
};
