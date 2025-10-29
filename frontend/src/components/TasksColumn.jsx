import "./styles/task.css";
import "./styles/board.css";
import TaskCard from "./TaskCard";

const TaskColumn = ({column , taskList = []}) => {
  return (
    <div className="board-column">
      <p className="board-col-title"> { column } ({taskList.length })</p>
      <div className="tasks-list">
          {taskList
              .map(task => <TaskCard  task={task} key={task.id} />)
          }
      </div>
    </div>
  );
};


export default TaskColumn;