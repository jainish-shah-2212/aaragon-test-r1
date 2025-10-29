import { useContext, createContext, useEffect, useState } from "react";
import boardService from "../services/boardService";

const BoardContext = createContext(null);

export const BoardProvider = ({ children }) => {

    const [selectedBoard, setSelectedBoard] = useState(null);
    const [boards, setBoards] = useState([]);

    const fetchAllBoards = async () => {
        try {
            const boardsData = await boardService.getAllBoards(true);
            setBoards(boardsData);
            let defaultBoard = boardsData[0];
            if(defaultBoard) {
                setSelectedBoard(defaultBoard);
            }
        } catch (error) {
            console.error("Error fetching boards:", error);
        }
    }
    
    const createBoard = async (data) => {
       const resp =  await boardService.createBoard(data);
       setBoards(prevBoards => [...prevBoards,resp]);
    }

    const deleteBoard = async () => {
        const boardId = selectedBoard.id;
        await boardService.deleteBoard(boardId);
        const newBoards = boards.filter(ele => ele.id !== boardId);
       setBoards(newBoards);
       setSelectedBoard(newBoards[0]);

    }

    useEffect(() => {
        fetchAllBoards();
    }, []);

    return (
        <BoardContext.Provider value={{selectedBoard, boards, setSelectedBoard , createBoard, deleteBoard}}>
            {children}
        </BoardContext.Provider>
    );
}


export const useBoardContext = () => {
    const context =  useContext(BoardContext);
    if(!context) {
        throw new Error("useBoardContext must be used within a BoardProvider");
    }
    return {
     ...context
    };
}
