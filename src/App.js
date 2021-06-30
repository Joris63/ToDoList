import './App.css';
import React from 'react';
import ToDoList from './components/ToDoList/ToDoList';
import AddToDo from './components/AddToDo/AddToDo';

const initialGlobalState = {
  count: 0,
};

// Create a Context for the (global) State
const GlobalState = React.createContext();

class Global extends React.Component {
  constructor(props) {
    super(props);

    // Set the initial (global) State
    this.state = {
      globals: initialGlobalState || {},
    };
  }

  // Expose the setGlobals function to the Globals object
  componentDidMount() {
    GlobalState.set = this.setGlobalState;
  }

  setGlobalState = (data = {}) => {
    const { globals } = this.state;

    // Loop over the data items by key, only updating those which have changed
    Object.keys(data).forEach((key) => {
      globals[key] = data[key];
    });

    // Update the state with the new State
    this.setState(globals);
  };

  render() {
    const { globals } = this.state;
    const { Root } = this.props;

    return (
      // Pass the current value of GlobalState, based on this components' State, down
      <GlobalState.Provider value={globals}>
        <Root />
      </GlobalState.Provider>
    );
  }
}

// Create a shorthand Hook for using the GlobalState
const useGlobalState = () => React.useContext(GlobalState);

// Create an example component which both renders and modifies the GlobalState
function SomeComponent() {
  const { count } = useGlobalState();

  // Create a function which mutates GlobalState
  function incrementCount() {
    GlobalState.set({
      count: count + 1,
    });
  }

  return <div onClick={incrementCount}>{count}</div>;
}

export default function App() {
  let newDate = new Date()
  let date = newDate.getDate();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let monthIndex = newDate.getMonth() + 1;
  let year = newDate.getFullYear();


  // Note: within the Root function we can return any Component (not just SomeComponent, but also a Router for instance)
  return (
    <div className="container">
      <div className="main">
        <header>
          <h1 className="title">ToDo List</h1>
          <div className="date">
            <h1 id="date">{date}</h1>
            <div>
              <p id="month">{months[monthIndex]}</p>
              <p id="year">{year}</p>
            </div>
          </div>
        </header>
        <ToDoList></ToDoList>
        <AddToDo></AddToDo>
      </div>
    </div>
  );
}

// Expose the GlobalState object to the window (allowing GlobalState.set({ count: 'new' }) from anywhere in the code (even your console))
window.GlobalState = GlobalState;
