import "../../styles/ConfirmDeleteModal.css";
import * as Icon from "react-bootstrap-icons";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (e) => {
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
        <h1>{title}</h1>
        <p>{message}</p>
        <div className="confirm-delete-modal-actions">
          <button onClick={onConfirm} className="confirm-delete-button-confirm">
            <Icon.CheckCircleFill color="#0FC41A" size={40} />
          </button>
          <button onClick={onClose} className="confirm-delete-button-cancel">
            <Icon.XCircleFill color="#FF3333" size={40} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
