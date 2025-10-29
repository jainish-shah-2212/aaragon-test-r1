import { useBoardContext } from "../context/boardContext";
import { useTaskContext } from "../context/taskContext";
import TaskColumn from "./TasksColumn";

import "./styles/board.css";

const Board = () => {  

    const { tasks: taskList } = useTaskContext();
    const { selectedBoard , boards} = useBoardContext();

    const columns = selectedBoard ? selectedBoard.columns : [];
    
    const handleAddNewColumn = () => {
        // Logic to add a new column
    }
    return (
            <div className="board-container" style={{"--cols" : columns.length + 1}}>
                {boards.length === 0 ? (
                    <div className="no-board-placeholder">
                        <p className="no-board-text"> No Boards Available. Please create a new board. </p>
                    </div>
                ) : <> {columns.map(column => (
                    <TaskColumn  key={column} column={column} taskList={taskList.filter(ele => ele.status === column)}/>
                ))} <button className="new-col" onClick={handleAddNewColumn}> + New Column </button> </> }

            </div>
    )

};

export default Board;