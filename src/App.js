import './App.css';
import React from 'react';

// Initial toDo List
const initialGlobalState = {
  toDo: [],
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

  // Get Current Day, Month and Year
  let newDate = new Date()
  let date = newDate.getDate();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let monthIndex = newDate.getMonth() + 1;
  let year = newDate.getFullYear();


  /*
  ===============
  All methods concerning todo list
  ===============
  */
  
  // Add a to do item
  function AddToDo() {
    GlobalState.set({
      toDo: toDo.concat([{ id: toDo.length, title: "New task...", editable: false, completed: false }])
    });
  }

  // Toggle the input to edit the title
  function EditTitle(index, state) {
    toDo[index] = { id: toDo[index].id, title: toDo[index].title, editable: state, completed: toDo[index].completed };

    GlobalState.set({
      toDo: toDo
    });
  }

  // Edit the title of the actual item
  function EditToDo(index) {
    toDo[index] = { id: toDo[index].id, title: document.getElementById("input" + index).value, editable: toDo[index].editable, completed: toDo[index].completed };
    GlobalState.set({
      toDo: toDo
    });
    EditTitle(index, false);
  }

  // Edit the status of the to do item
  function ChangeToDoStatus(index) {
    toDo[index] = { id: toDo[index].id, title: toDo[index].title, editable: toDo[index].editable, completed: document.getElementById("checkbox" + index).checked };

    GlobalState.set({
      toDo: toDo
    });
  }

  // Delete the to do item
  function DeleteToDo(index) {
    toDo.splice(index, 1);

    GlobalState.set({
      toDo: toDo
    });
  }

  return (
    <div className="main">
      {/* The header with the current date */}
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

      {/* The list itself containing all the items */}
      <ul>
        {/* Render all the items using the .map method */}
        {toDo.map((todo, index) => (
          <li key={index}>
            {/* Show the edit button if the to do is not editable */}
            {!todo.editable ? (
              <button className="edit-button"><i className="fa fa-pencil-square-o" onClick={() => EditTitle(index, true)}></i></button>
            ) : null}

            {/* Shows either the paragraph or the input depending on if it's editable */}
            {todo.editable ? (
              <input id={"input" + index} maxLength={25} type='text' ></input>
            ) : (
              <p className={todo.completed ? "crossed-out" : ""} id={"title" + index} > {todo.title}</p>
            )}

            {/* Shows either the Checkbox or the Buttons depending on if it's editable */}
            {todo.editable ? (
              <div>
                <button className="confirm-button" onClick={() => EditToDo(index)}><i className="fa fa-check"></i></button>
                <button className="cancel-button" onClick={() => EditTitle(index, false)}><i className="fa fa-times"></i></button>
              </div>
            ) : (
              <label className="checkbox-wrapper"  >
                <input checked={todo.completed} id={"checkbox" + index} type="checkbox" onClick={() => ChangeToDoStatus(index)}></input>
                <span className="checkmark"></span>
              </label>
            )}

            {/* The delete button shows up on hover over a todo item */}
            <button className="delete" onClick={() => DeleteToDo(index)}><i class="fa fa-trash"></i></button>
          </li>
        ))}
      </ul>

      {/* The footer with the add todo item button */}
      <footer>
        <button onClick={AddToDo}>
          <i className="fa fa-plus"></i>
        </button>
      </footer>
    </div >
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

