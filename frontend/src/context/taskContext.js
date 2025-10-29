import taskService from "../services/taskService";
import {createContext, useEffect, useState , useContext  } from "react";
import { useBoardContext } from "./boardContext";

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    const { selectedBoard } = useBoardContext();


    useEffect(() => {
        if(selectedBoard)
            fetchAllTasks();
    } , [selectedBoard]);

    const fetchAllTasks = async () => {
        try {
            const tasksData = await taskService.getAllTasksForBoard(selectedBoard.id);
            setTasks(tasksData);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }

    const selectTask = (task) => {
        setSelectedTask(task);
    }

    const addNewTask = async (taskData) => {
        try {
            const newTask = await taskService.createTask({ ...taskData });
            setTasks(prevTasks => [...prevTasks, newTask]);
        } catch (error) {
            console.error("Error creating task:", error);
        }
    }
    
    const updateTask = async (updatedData) => { 
        try {
            const updatedTask = await taskService.updateTask({ ...updatedData });
            setTasks(prevTasks => prevTasks.map(task => task.id === updatedData.id ? updatedTask : task));
        } catch (error) {
            console.error("Error updating task:", error);
        }
    }

    const deleteTask = async (id) => {
        try {
            await taskService.deleteTask({ id });
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }

    return (
        <TaskContext.Provider value={{ tasks, addNewTask , updateTask, deleteTask , selectedTask , setSelectedTask }}>
            {children}
        </TaskContext.Provider>
    );
}

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if(!context) {
        throw new Error("useTaskContext must be used within a TaskProvider");
    }
    return {
        ...context
        // tasks: context.tasks,
        // addNewTask: context.addNewTask,
        // updateTask: context.updateTask,
        // deleteTask: context.deleteTask,
        // selectedTask : context.selectTask, 
        // setSelectedTask: context.setSelectedTask
    };
}
