import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PublicLink } from "../components/PublicLink";
import {
  usernameExists,
  getUserProfileInfo,
  getProfilePic,
} from "../firebase/firebase";
import { PageNotFound } from "./PageNotFound";

export const PublicProfileView = () => {
  const params = useParams();
  const [profile, setProfile] = useState(null);
  const [picUrl, setPicUrl] = useState("");
  const [state, setState] = useState(0);

  useEffect(() => {
    const getProfile = async () => {
      const username = params.username;
      try {
        const userUid = await usernameExists(username);
        if (userUid) {
          const userInfo = await getUserProfileInfo(userUid);
          setProfile(userInfo);
          if (userInfo) {
            const url = await getProfilePic(
              userInfo.profileInfo.profilePicture
            );
            setPicUrl(url);
          }
        } else {
          setState(7);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getProfile();
  }, [params]);

  if (state === 7) {
    return <PageNotFound />;
  }
  return (
    <div>
      <div>
        <img src={picUrl} alt="profile pic" />
      </div>
      <h2>{profile?.profileInfo.username}</h2>
      <h3>{profile?.profileInfo.displayName}</h3>
      <div>
        {profile?.linksInfo.map((link) => {
          return <PublicLink key={link.id} link={link} />;
        })}
      </div>
    </div>
  );
};
