import React from "react";
import "../../styles/confirmDeleteModal.css";

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmButtonText = "Eliminar",
  cancelButtonText = "Cancelar",
}) => {
  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (e) => {
    // Cierra el modal si se hace clic fuera del contenido del modal
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="confirm-delete-modal-overlay" onClick={handleOverlayClick}>
      <div
        className="confirm-delete-modal-content"
        onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del modal lo cierre
      >
        <h4>{title || "Confirmar Acción"}</h4>
        <p>{message || "¿Estás seguro de que quieres proceder?"}</p>
        <div className="confirm-delete-modal-actions">
          <button onClick={onConfirm} className="confirm-delete-button-confirm">
            {confirmButtonText}
          </button>
          <button onClick={onClose} className="confirm-delete-button-cancel">
            {cancelButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
