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
    <div className="link">
      <div className="link-info">
        <div className="link-title">
          {editTitle ? (
            <>
              <input
                type="text"
                ref={titleRef}
                value={currentTitle}
                onChange={handleChangeTitle}
                onBlur={handleBlurTitle}
              />
            </>
          ) : (
            <>
              {currentTitle}
              <button className="btn-edit" onClick={handleEditTitle}>
                <span className="material-icons">edit</span>
              </button>
            </>
          )}
        </div>
        <div className="link-url">
          {editUrl ? (
            <>
              <input
                type="text"
                ref={urlRef}
                value={currentUrl}
                onChange={handleChangeUrl}
                onBlur={handleBlurUrl}
              />
            </>
          ) : (
            <>
              <a className="link-url" href={`http://${currentUrl}`}>
                {currentUrl}
              </a>
              <button className="btn-edit" onClick={handleEditUrl}>
                <span className="material-icons">edit</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div>
        <button className="btn-delete" onClick={handleDelete}>
          <span className="material-icons">delete</span>
        </button>
      </div>
    </div>
  );
};
