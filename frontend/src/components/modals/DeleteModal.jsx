import BaseModal from "./BaseModal";
import "./styles.css";

const DeleteModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  itemName = "this item" 
}) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={onConfirm}
      data={{ title: "Confirm Deletion" }}
      disabled={false} // always allow confirm
    >
      <div className="delete-modal">
        <h3 className="delete-title">Are you sure?</h3>
        <p className="delete-text">
          Are you sure you want to delete <strong>{itemName}</strong>? 
          <br />
          This action cannot be undone.
        </p>
      </div>
    </BaseModal>
  );
};

export default DeleteModal;
