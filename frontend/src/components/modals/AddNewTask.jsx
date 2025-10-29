import { useState } from "react";
import BaseModal from "./BaseModal";
import "./styles.css";


const AddNewTask = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [showError, setShowError] = useState(false);

  const handleChange = (ev) => {
    const { name, value } = ev.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "title" && value.trim() === "") {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      setShowError(true);
      return;
    }

    onSubmit(formData); // callback to parent for task creation
    setFormData({ title: "", description: "" }); // reset form
    onClose(); // close modal
  };

  const isDisabled = !formData.title.trim();

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      data={{ title: "Add New Task" }}
      disabled={isDisabled}
    >
      <div className="input-form">
        <div className="form-input-field">
          <label className="form-label">Task Title</label>
          {showError && (
            <span className="form-error">Title is required</span>
          )}
          <input
            className="form-input"
            name="title"
            value={formData.title}
            onChange={handleChange}
            type="text"
            placeholder="Task Title"
          />
        </div>
        <div className="form-input-field">
          <label className="form-label">Task Description</label>
          <textarea
            className="form-input"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Task Description"
          ></textarea>
        </div>
      </div>
    </BaseModal>
  );
};

export default AddNewTask;
