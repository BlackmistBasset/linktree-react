import React from "react";

export const PublicLink = ({ link }) => {
  return (
    <div>
      <a href={link.url}>{link.title}</a>
    </div>
  );
};
