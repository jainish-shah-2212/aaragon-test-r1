import { useState } from "react";
import { useTaskContext } from "../context/taskContext";
import UpdateTask from "./modals/UpdateTask";
import "./styles/task.css";
import { useBoardContext } from "../context/boardContext";

const TaskCard = ({ task }) => {
  const { updateTask } = useTaskContext();
  const { boards } = useBoardContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelect = () => {
    setIsModalOpen(true);
  };


  const handleSubmit = async (data) => {
    await updateTask({
        ...task,
      ...data,
    });
    setIsModalOpen(false);
  };

  return (
    <>
      <div id={task.id} className="task-card" onClick={handleSelect}>
        <p className="task-title">{task.title}</p>
        <p className="task-desc">{task.description}</p>
      </div>

       <UpdateTask
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={task}
        boardColumns={boards?.filter(ele => ele.id === task.boardId)[0]?.columns || []}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default TaskCard;
