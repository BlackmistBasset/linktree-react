import React, { useState } from "react";
import { AuthProvider } from "../components/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import { updateUser, usernameExists } from "../firebase/firebase";

export const RegisterView = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [username, setUsername] = useState("");
  const handleUserLoggedIn = (user) => {
    navigate("/dashboard");
  };

  const handleUserNotRegistered = (user) => {
    setCurrentUser(user);
    setState(3);
  };

  const handleUserNotLoggedIn = () => {
    navigate("/login");
  };

  const handleInputUserName = (e) => {
    setUsername(e.target.value);
  };

  const handleContinue = async () => {
    if (username !== "") {
      const exists = await usernameExists(username);
      if (exists) {
        setState(5);
      } else {
        const tmp = { ...currentUser };
        tmp.username = username;
        tmp.processCompleted = true;
        await updateUser(tmp);
        setState(6);
      }
    }
  };

  if (state === 3 || state === 5) {
    return (
      <div>
        <h1>Bienvenido {currentUser.displayName}</h1>
        <p>Para terminar el proceso, elige un nombre de usuario:</p>
        {state === 5 ? <p>El nombre de usuario ya existe, escoge otro</p> : ""}
        <div>
          <input type="text" onChange={handleInputUserName} />
        </div>
        <div>
          <button onClick={handleContinue}>Continuar</button>
        </div>
      </div>
    );
  }

  if (state === 6) {
    return (
      <div>
        <h1>Felicidades! Ya puedes crear tus links.</h1>
        <Link to="/dashboard">Continuar</Link>
      </div>
    );
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    ></AuthProvider>
  );
};
