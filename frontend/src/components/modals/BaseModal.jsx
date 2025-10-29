import "./styles.css";

const BaseModal = ({ children, isOpen, onClose, handleSubmit, data = {}, disabled = true }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{data.title}</h3>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-body">{children}</div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button
            disabled={disabled}
            style={{ cursor: disabled ? "not-allowed" : "pointer" }}
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default BaseModal;
