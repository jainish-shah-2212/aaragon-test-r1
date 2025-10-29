import axios from "axios";

const API_URL = "http://localhost:5000/api/boards/";

const COMMON_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',

};
const getAllBoards = async (includeTasks = false) => {
  const response = await axios.get(API_URL);
  return response.data;

}

 
const createBoard = async ({title, columns, description}) => {
  const boardCols = columns.filter(ele => ele && ele.length > 0).map(ele => ele.toLowerCase());
  const response = await axios.post(API_URL, { title, columns : boardCols , description });
  return response.data;
}

const updateBoard = async (id, {title, description}) => {
  const response = await axios.put(`${API_URL}/${id}`, { title, description });
  return response.data;
}

const deleteBoard = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
} 


const boardService = {
  getAllBoards,
    createBoard,
    updateBoard,
    deleteBoard
};

export default boardService;