import './App.css';
import Board from './components/Board';
import Sidebar from './components/Sidebar';
import BoardHeader from './components/BoardHeader';
import { BoardProvider } from './context/boardContext';
import { TaskProvider } from './context/taskContext';

function App() {
  return (
    <div className="App">
      <BoardProvider>
        <Sidebar />
        <TaskProvider>
          <div className='board-main-container'> 
            <BoardHeader />
            <Board />
          </div>
        </TaskProvider>
      </BoardProvider>
    </div>
  );
}

export default App;
