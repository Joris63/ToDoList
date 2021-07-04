import './ToDoList.css'
import { GlobalState, useGlobalState } from '../../GlobalState'
import ToDoItem from "../ToDoItem/ToDoItem";
import AddToDo from "../AddToDo/AddToDo";

function ToDoList() {

    const { toDo } = useGlobalState();

    // Get Current Day, Month and Year
    let newDate = new Date()
    let date = newDate.getDate();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthIndex = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return (
        <div className="main">
            {/* The header with the current date */}
            <header>
                <h1 className="title">ToDo List</h1>
                <div className="date">
                    <h1 id="date">{date}</h1>
                    <div>
                        <p id="month">{months[monthIndex - 1]}</p>
                        <p id="year">{year}</p>
                    </div>
                </div>
            </header>
            <ul>
                {/* Render all the items using the .map method */}
                {toDo.map((todo, index) => (
                    <ToDoItem key={index} todo={todo} toDo={toDo} GlobalState={GlobalState} />
                ))}
            </ul>
            <AddToDo toDo={toDo} GlobalState={GlobalState} />
        </div >
    );
}

export default ToDoList;