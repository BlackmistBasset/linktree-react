import React, { useState, useRef } from "react";
import { AuthProvider } from "../components/AuthProvider";
import { DashboardWrapper } from "../components/DashboardWrapper";
import { useNavigate } from "react-router-dom";
import { getProfilePic, setProfilePic, updateUser } from "../firebase/firebase";

export const EditProfileView = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [state, setState] = useState(0);
  const [profileUrl, setProfileUrl] = useState(null);
  const fileRef = useRef(null);
  const handleUserLoggedIn = async (user) => {
    setCurrentUser(user);
    const url = await getProfilePic(user.profilePicture);
    setProfileUrl(url);
    setState(2);
  };
  const handleUserNotRegistered = (user) => {
    navigate("/login");
  };

  const handleUserNotLoggedIn = () => {
    navigate("/login");
  };

  const handleOpenFilePicker = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleChangeFile = (e) => {
    const files = e.target.files;
    const fileReader = new FileReader();
    if (fileReader && files && files.length > 0) {
      fileReader.readAsArrayBuffer(files[0]);
      fileReader.onload = async () => {
        const imgData = fileReader.result;
        const res = await setProfilePic(currentUser.uid, imgData);
        if (res) {
          const tmpUser = { ...currentUser };
          tmpUser.profilePicture = res.metadata.fullPath;
          await updateUser(tmpUser);
          setCurrentUser({ ...tmpUser });
          const url = await getProfilePic(currentUser.profilePicture);
          setProfileUrl(url);
        }
      };
    }
  };

  if (state !== 2) {
    return (
      <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoggedIn={handleUserNotLoggedIn}
        onUserNotRegistered={handleUserNotRegistered}
      ></AuthProvider>
    );
  }
  return (
    <DashboardWrapper>
      <div>
        <h2>Editar Perfil</h2>
        <div>
          <div>
            <img src={profileUrl} alt="foto de perfil" width={100} />
          </div>
          <div>
            <button onClick={handleOpenFilePicker}>
              Editar foto de perfil
            </button>
            <input
              ref={fileRef}
              type="file"
              style={{ display: "none" }}
              onChange={handleChangeFile}
            />
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
};
