import axios from "axios";



const BASE_API_URL = `http://localhost:5000/api/boards`;


const createTask = async ({title, description, boardId}) => {
  const API_URL = `${BASE_API_URL}/${boardId}/tasks`;
  try{
      const response = await axios.post(API_URL, { title , description });
        return response.data;
  }catch(err){
      console.error("Error creating task:", err);
  }
}

const updateTask = async (taskDetails) => {
    const API_URL = `${BASE_API_URL}/${taskDetails.boardId}/tasks/${taskDetails.id}`;
    const response = await axios.put(API_URL, { ...taskDetails });
  return response.data;
}

const deleteTask = async (taskDetails) => {
  const API_URL = `${BASE_API_URL}/${taskDetails.boardId}/tasks/${taskDetails.id}`;
  const response = await axios.delete(API_URL);
  return response.data;
}


const getAllTasksForBoard =  async (boardId) => {
    const API_URL = `${BASE_API_URL}/${boardId}/tasks`;
    const response = await axios.get(API_URL);
    return response.data;
}

const taskService = {
    createTask,
    updateTask,
    deleteTask,
    getAllTasksForBoard
};

export default taskService;