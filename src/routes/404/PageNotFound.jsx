import React from "react";
import { DashboardWrapper } from "../../components/DashboardWrapper";
import { Link } from "react-router-dom";

import style from "./PageNotFound.module.css";
export const PageNotFound = () => {
  return (
    <DashboardWrapper>
      <h1 className="title">La página solicitada no existe :(</h1>
      <Link className={style.link} to="/dashboard">
        Volver al incio
      </Link>
    </DashboardWrapper>
  );
};
