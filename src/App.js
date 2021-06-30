import './App.css';
import React from 'react';


const initialGlobalState = {
  toDo: [{ id: 0, title: "New task...", completed: false }],
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
function ToDoList() {
  const { toDo } = useGlobalState();
  let newDate = new Date()
  let date = newDate.getDate();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let monthIndex = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  // Create a function which mutates GlobalState
  function AddToDo() {
    GlobalState.set({
      toDo: toDo.push({ id: toDo.length, title: "New task...", completed: false }),
    });
  }

  function EditToDo(index, title) {
    GlobalState.set({
      toDo: toDo[index] = { id: toDo[index].id, title: title, completed: toDo[index].completed },
    });
  }

  return (
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
      <ul>
        {toDo.map((todo, index) => (
            <li key={index}>
              <p>{todo.title}</p>
              <label className="checkbox-wrapper">
                <input type="checkbox"></input>
                <span className="checkmark"></span>
              </label>
            </li>
          ))}
      </ul>
      <footer>
        <button>
          <i className="fa fa-plus"></i>
        </button>
      </footer>
    </div>
  );
}


export default function App() {


  // Note: within the Root function we can return any Component (not just SomeComponent, but also a Router for instance)
  return (
    <div className="container">
      <Global Root={() => <ToDoList />} />
    </div>
  );
}

