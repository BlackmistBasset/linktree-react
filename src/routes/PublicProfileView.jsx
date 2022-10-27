import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  usernameExists,
  getUserProfileInfo,
  getProfilePic,
} from "../firebase/firebase";

export const PublicProfileView = () => {
  const params = useParams();
  const [profile, setProfile] = useState(null);
  const [picUrl, setPicUrl] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      const username = params.username;
      try {
        const userUid = await usernameExists(username);
        if (userUid) {
          const userInfo = await getUserProfileInfo(userUid);
          setProfile(userInfo);
          console.log("if user uid");
          if (userInfo) {
            console.log("if userInfo");
            console.log(userInfo);
            console.log(userInfo.profileInfo);
            const url = await getProfilePic(
              userInfo.profileInfo.profilePicture
            );
            if (url) {
              setPicUrl(url);
              console.log(url);
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    getProfile();
  }, [params]);
  return (
    <div>
      <div>
        <img src={picUrl} alt="profile pic" />
      </div>
      <h2>asd</h2>
      <h3>Displayname</h3>
      <div>Links</div>
    </div>
  );
};
