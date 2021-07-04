import './AddToDo.css'
import ToDo from "../../models/ToDo";

function AddToDo(props) {

    // Add a to do item
    function AddToDo() {
        props.toDo.push(new ToDo(props.toDo.length, "New task...", false, false));

        props.GlobalState.set({
            toDo: props.toDo
        });
    }

    return (
        <footer>
            <button onClick={AddToDo}>
                <i className="fa fa-plus"></i>
            </button>
        </footer>
    );
}

export default AddToDo;