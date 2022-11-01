import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "../../components/AuthProvider";
import { DashboardWrapper } from "../../components/DashboardWrapper";

import style from "./LoginView.module.css";

export const LoginView = () => {
  const navigate = useNavigate();
  // state:
  // 0: inicializado
  //1: loading
  //2: login completo
  //3: login pero sin registro
  //4: no hay nadie logueado
  //5: ya existe el username
  //6: nuevo username, click para continuar
  const [state, setState] = useState(0);

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
  <DashboardWrapper>
    <h1 className="title">Cargando...</h1>
  </DashboardWrapper>;

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    >
      <DashboardWrapper>
        <h1 className="title">Cargando...</h1>
      </DashboardWrapper>
    </AuthProvider>
  );
};
