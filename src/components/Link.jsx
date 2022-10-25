import React from "react";

export const Link = ({ url, title, docId, onDelete, onUpdate }) => {
  return (
    <div>
      <a href={url}>{title}</a>
    </div>
  );
};
