import { useState } from "react";
import { useBoardContext } from "../context/boardContext";
import "./styles/index.css";
import CreateBoard from "./modals/CreateBoard";
import boardService from "../services/boardService";
const Sidebar = () => {


    const { boards : allBoards, selectedBoard, setSelectedBoard , createBoard} = useBoardContext();
    const [isCreateBoardOpen,setIsCreateBoardOpen ] = useState(false);

    const addNewBoard = async (data)  =>{
        createBoard(data);
    }


    return (
        <div className={"sidebar"}>
            <div className="sidebar-content">
                <div class="kanban-logo">
                    <div class="logo-icon">
                        <span></span><span></span><span></span>
                    </div>
                    <p class="logo-text">kanban</p>
                </div>
                <p className="board-title"> All Boards ({allBoards.length}) </p>
                <div className="board-list" > 
                    {allBoards.map(board => (
                        <button
                            onClick={ (ev) => setSelectedBoard(allBoards.filter(ele => ele.id === board.id)[0]) }
                            id={board.id}
                            key={board.id} 
                            className={`board-item ${selectedBoard && selectedBoard.id === board.id ? 'selected' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="3" width="6" height="18" rx="1"/>
                                <rect x="15" y="3" width="6" height="10" rx="1"/>
                            </svg>
                            <p> {board.title}</p>
                        </button>
                    ))}
                </div>
                <button onClick={() => setIsCreateBoardOpen(true)} className="board-item create-new-board"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="3" width="6" height="18" rx="1"/>
                        <rect x="15" y="3" width="6" height="10" rx="1"/>
                    </svg>
                    <p> + Create New Board </p> 
                </button>
            </div>
            <CreateBoard   isOpen={isCreateBoardOpen}
  onClose={() => setIsCreateBoardOpen(false)}
  onSubmit={addNewBoard} />
        </div>
    );

}

export default Sidebar;