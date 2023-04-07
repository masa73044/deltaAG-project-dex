import React from "react";
import "./Windows90sModal.css";

const Windows90sModal = ({ open, title, children, onCancel }) => {
  if (!open) return null;

  return (
    <div className="Windows90sModal">
      <div className="Windows90sModal-header">
        <h2 className="Windows90sModal-title">{title}</h2>
        <span className="Windows90sModal-close" onClick={onCancel}>
          x
        </span>
      </div>
      <div className="Windows90sModal-content">{children}</div>
    </div>
  );
};

export default Windows90sModal;
