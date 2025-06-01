import React from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-container" onClick={handleOverlayClick}>
      <div className="modal-body" onClick={(e) => e.stopPropagation()}>
        {children} {}
      </div>
    </div>
  );
};

export default Modal;
