import './ToDoItem.css'

function ToDoItem(props) {

    // Toggle the input to edit the title
    function EditTitle(state) {
        props.toDo[props.todo.id].MakeEditable(state);

        props.GlobalState.set({
            toDo: props.toDo
        });
    }

    // Edit the title of the actual item
    function EditToDo() {
        props.toDo[props.todo.id].ChangeTitle(document.getElementById("input" + props.todo.id).value);

        props.GlobalState.set({
            toDo: props.toDo
        });
        EditTitle(false);
    }

    // Edit the status of the to do item
    function ChangeToDoStatus() {
        props.toDo[props.todo.id].ChangeStatus(document.getElementById("checkbox" + props.todo.id).checked);

        props.GlobalState.set({
            toDo: props.toDo
        });
    }

    // Delete the to do item
    function DeleteToDo() {
        props.toDo.splice(props.todo.id, 1);

        props.GlobalState.set({
            toDo: props.toDo
        });
    }

    return (
        <li>
            {/* Show the edit button if the to do is not editable */}
            {!props.todo.editable ? (
                <button className="edit-button"><i className="fa fa-pencil-square-o" onClick={() => EditTitle(true)}></i></button>
            ) : null}

            {/* Shows either the paragraph or the input depending on if it's editable */}
            {props.todo.editable ? (
                <input id={"input" + props.todo.id} maxLength={25} type='text' ></input>
            ) : (
                <p className={props.todo.completed ? "crossed-out" : ""} id={"title" + props.todo.id} > {props.todo.title}</p>
            )}

            {/* Shows either the Checkbox or the Buttons depending on if it's editable */}
            {props.todo.editable ? (
                <div>
                    <button className="confirm-button" onClick={() => EditToDo()}><i className="fa fa-check"></i></button>
                    <button className="cancel-button" onClick={() => EditTitle(false)}><i className="fa fa-times"></i></button>
                </div>
            ) : (
                <label className="checkbox-wrapper"  >
                    <input checked={props.todo.completed} id={"checkbox" + props.todo.id} type="checkbox" onChange={() => ChangeToDoStatus()}></input>
                    <span className="checkmark"></span>
                </label>
            )}

            {/* The delete button shows up on hover over a todo item */}
            <button className="delete" onClick={() => DeleteToDo()}><i className="fa fa-trash"></i></button>
        </li>
    );
}

export default ToDoItem;