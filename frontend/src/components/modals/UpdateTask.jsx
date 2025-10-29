import { useState } from "react";
import BaseModal from "./BaseModal";
import "./styles.css";

const UpdateTask = ({ 
  isOpen, 
  onClose, 
  initialData = {}, 
  boardColumns = [], 
  onSubmit 
}) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [status, setStatus] = useState(initialData.status || boardColumns[0] || "");
  const [canSubmit, setCanSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title") setTitle(value);
    if (name === "description") setDescription(value);
    if (name === "status") setStatus(value);

    if (value.trim() !== "" && title.trim() !== "" && description.trim() !== "") {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({ title, description, status });
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      data={{ title: "Update Task" }}
      disabled={!canSubmit}
    >
      <div className="update-task-form">
        <div className="form-input-field">
          <label className="form-label">Task Title</label>
          <input
            className="form-input"
            name="title"
            value={title}
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
            value={description}
            onChange={handleChange}
            placeholder="Task Description"
          />
        </div>

        <div className="form-input-field">
          <label className="form-label">Task Status</label>
          <select
            className="form-input"
            name="status"
            value={status}
            onChange={handleChange}
          >
            {boardColumns.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>
      </div>
    </BaseModal>
  );
};

export default UpdateTask;
