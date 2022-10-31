import React from "react";

export const PublicLink = ({ link }) => {
  return (
    <a className="public-link-container" href={link.url}>
      {link.title}
    </a>
  );
};
