import { useState } from "react";
import { useBoardContext } from "../context/boardContext";
import { useTaskContext } from "../context/taskContext";
import AddNewTask from "./modals/AddNewTask";
import "./styles/board.css";
import DeleteModal from "./modals/DeleteModal";

const BoardHeader = () => {
 
    const {selectedBoard, deleteBoard} = useBoardContext();
    const { addNewTask } = useTaskContext();
    const [showAddTaskModal, setShowAddTaskModal ] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleSubmit = async (data) => {
        addNewTask({ ...data, boardId : selectedBoard.id });
        setShowAddTaskModal(false);
    }

    const handleDelete = async () => {        
        deleteBoard();
        setShowDeleteModal(false);
    }

  return (
    <div className="board-header">
      <h2>{selectedBoard?.title}</h2>
      <div>
      {selectedBoard && selectedBoard.title && <button onClick={() => setShowAddTaskModal(true)} className="board-header-btn add-new-task"> + Add New Task </button>}
      {selectedBoard && selectedBoard.title && <button onClick={() => setShowDeleteModal(true)} className="board-header-btn delete-board"> Delete Board </button>}
      </div>

      {<AddNewTask   
      isOpen={showAddTaskModal} 
      onClose={() => setShowAddTaskModal(false)} 
      onSubmit={handleSubmit} 
/>}

      {<DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        itemName={selectedBoard?.title}
      />}

    </div>
  );
}

export default BoardHeader;