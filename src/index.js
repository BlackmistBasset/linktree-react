import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginView } from "./routes/login/LoginView";
import { DashboardView } from "./routes/dashboard/DashboardView";
import { EditProfileView } from "./routes/editProfile/EditProfileView";
import { SignOutView } from "./routes/logout/SignOutView";
import { PublicProfileView } from "./routes/publicProfile/PublicProfileView";
import { RegisterView } from "./routes/register/RegisterView";
import { PageNotFound } from "./routes/404/PageNotFound";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginView />} />
      <Route path="login" element={<LoginView />} />
      <Route path="dashboard" element={<DashboardView />} />
      <Route path="dashboard/profile" element={<EditProfileView />} />
      <Route path="signout" element={<SignOutView />} />
      <Route path=":username" element={<PublicProfileView />} />
      <Route path="register" element={<RegisterView />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
);
