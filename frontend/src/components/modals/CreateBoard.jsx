import { useState } from "react";
import BaseModal from "./BaseModal";
import "./styles.css";

const CreateBoard = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    columns: "",
  });

  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "title" && value.trim() === "") {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  const handleSubmit = () => {
    const { title, columns } = formData;
    if (!title.trim() || !columns.trim()) {
      setShowError(true);
      return;
    }

    const parsedColumns = columns
      .split(",")
      .map((col) => col.trim())
      .filter(Boolean);

    onSubmit({
      title: title.trim(),
      columns: parsedColumns,
    });

    setFormData({ title: "", columns: "" }); // reset form
    onClose();
  };

  const isDisabled = !formData.title.trim() || !formData.columns.trim();

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      data={{ title: "Create New Board" }}
      disabled={isDisabled}
    >
      <div className="create-board-modal">
        <div className="form-input-field">
          <label htmlFor="title" className="form-label">Board Title</label>
          {showError && (
            <span className="form-error">Title and columns are required</span>
          )}
          <input
            className="form-input"
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter board title"
            required
          />
        </div>

        <div className="form-input-field">
          <label className="form-label subtler-text">Board Columns</label>
          <p className="subtle-hint">Comma-separated list of columns</p>
          <input
            className="form-input"
            type="text"
            id="columns"
            name="columns"
            value={formData.columns}
            onChange={handleChange}
            placeholder="e.g. Todo, In-Progress, Done"
            required
          />
        </div>
      </div>
    </BaseModal>
  );
};

export default CreateBoard;
