import './App.css';
import Global from './GlobalState';
import ToDoList from './components/ToDoList/ToDoList';

function App() {

  return (
    <div className="container">
      <Global Root={() => <ToDoList />}></Global>
    </div>
  );
}

export default App;