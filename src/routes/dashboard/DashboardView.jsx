import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "../../components/AuthProvider";
import { DashboardWrapper } from "../../components/DashboardWrapper";
import { v4 as uuidv4 } from "uuid";
import {
  getLinks,
  insertNewLink,
  updateLink,
  deleteLink,
} from "../../firebase/firebase";
import { Link } from "../../components/Link";

import style from "./DashboardView.module.css";

export const DashboardView = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [state, setState] = useState(0);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);

  const handleUserLoggedIn = async (user) => {
    setCurrentUser(user);
    setState(2);
    const resLinks = await getLinks(user.uid);
    setLinks([...resLinks]);
  };
  const handleUserNotRegistered = (user) => {
    navigate("/login");
  };

  const handleUserNotLoggedIn = () => {
    navigate("/login");
  };
  if (state === 0) {
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
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    addLink();
  };

  const handleOnChange = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "url") {
      setUrl(e.target.value);
    }
  };

  const addLink = () => {
    if (title !== "" && url !== "") {
      const newLink = {
        id: uuidv4(),
        title: title,
        url: url,
        uid: currentUser.uid,
      };
      const res = insertNewLink(newLink);
      newLink.docId = res.id;
      setTitle("");
      setUrl("");
      setLinks([...links, newLink]);
    }
  };

  const handleDeleteLink = async (docId) => {
    await deleteLink(docId);
    const tmp = links.filter((link) => link.docId !== docId);
    setLinks([...tmp]);
  };

  const handleUpdateLink = async (docId, title, url) => {
    const link = links.find((item) => item.docId === docId);
    link.title = title;
    link.url = url;
    await updateLink(docId, link);
  };

  return (
    <DashboardWrapper>
      <div className={style.title}>Administrador de Links</div>
      <form className={style.linksForm} onSubmit={handleOnSubmit}>
        <div className={style.labelContainer}>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleOnChange}
          />
        </div>
        <div className={style.labelContainer}>
          <label htmlFor="url">Url:</label>
          <input type="text" id="url" name="url" onChange={handleOnChange} />
        </div>
        <input className="btn" type="submit" value="Crear Link" />
      </form>
      <div className="links-container">
        <h2 className={style.title}>Mi lista de links:</h2>
        {links.map((link) => {
          return (
            <Link
              key={link.docId}
              docId={link.docId}
              url={link.url}
              title={link.title}
              onDelete={handleDeleteLink}
              onUpdate={handleUpdateLink}
            />
          );
        })}
      </div>
    </DashboardWrapper>
  );
};
