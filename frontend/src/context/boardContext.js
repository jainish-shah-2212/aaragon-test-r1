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

    useEffect(() => {
        fetchAllBoards();
    }, []);

    return (
        <BoardContext.Provider value={{selectedBoard, boards, setSelectedBoard , createBoard}}>
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
