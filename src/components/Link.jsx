import React, { useState, useRef, useEffect } from "react";

export const Link = ({ url, title, docId, onDelete, onUpdate }) => {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentUrl, setCurrentUrl] = useState(url);

  const [editTitle, setEditTitle] = useState(false);
  const [editUrl, setEditUrl] = useState(false);

  const titleRef = useRef(null);
  const urlRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, [editTitle]);

  useEffect(() => {
    if (urlRef.current) {
      urlRef.current.focus();
    }
  }, [editUrl]);

  const handleEditTitle = () => {
    setEditTitle(true);
  };

  const handleEditUrl = () => {
    setEditUrl(true);
  };

  const handleChangeTitle = (e) => {
    setCurrentTitle(e.target.value);
  };

  const handleChangeUrl = (e) => {
    setCurrentUrl(e.target.value);
  };

  const handleBlurTitle = () => {
    setEditTitle(false);
    onUpdate(docId, currentTitle, currentUrl);
  };

  const handleBlurUrl = () => {
    setEditUrl(false);
    onUpdate(docId, currentTitle, currentUrl);
  };

  const handleDelete = () => {
    onDelete(docId);
  };

  return (
    <div key={docId}>
      <div>
        <div>
          {editTitle ? (
            <>
              <input
                ref={titleRef}
                value={currentTitle}
                onChange={handleChangeTitle}
                onBlur={handleBlurTitle}
              />
            </>
          ) : (
            <>
              <button onClick={handleEditTitle}>Editar</button>
              {currentTitle}
            </>
          )}
        </div>
        <div>
          {editUrl ? (
            <>
              <input
                ref={urlRef}
                value={currentUrl}
                onChange={handleChangeUrl}
                onBlur={handleBlurUrl}
              />
            </>
          ) : (
            <>
              <button onClick={handleEditUrl}>Editar</button>
              {currentUrl}
            </>
          )}
        </div>
      </div>

      <div>
        <button onClick={handleDelete}>Eliminar</button>
      </div>
    </div>
  );
};
