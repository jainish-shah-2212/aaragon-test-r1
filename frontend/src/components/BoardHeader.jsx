import { useState } from "react";
import { useBoardContext } from "../context/boardContext";
import { useTaskContext } from "../context/taskContext";
import taskService from "../services/taskService";
import AddNewTask from "./modals/AddNewTask";

const BoardHeader = () => {
 
    const {selectedBoard} = useBoardContext();
    const { addNewTask } = useTaskContext();
    const [showAddTaskModal, setShowAddTaskModal ] = useState(false);

    const handleSubmit = async (data) => {
        addNewTask({ ...data, boardId : selectedBoard.id });
    }

  return (
    <div className="board-header">
      <h2>{selectedBoard?.title}</h2>
      {selectedBoard && selectedBoard.title && <button onClick={() => setShowAddTaskModal(true)} className="add-new-task"> + Add New Task </button>}
      {showAddTaskModal && <AddNewTask   
      isOpen={showAddTaskModal} 
      onClose={() => setShowAddTaskModal(false)} 
      onSubmit={handleSubmit} 
/>}
    </div>
  );
}

export default BoardHeader;