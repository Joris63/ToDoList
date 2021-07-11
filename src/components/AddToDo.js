import ToDo from "../models/ToDo";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddSharpIcon from '@material-ui/icons/AddSharp';

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        borderRadius: '50%',
        top: 0,
        left: '35%',
        width: '3.5em',
        height: '3.5em',
        background: '#7bed9f',
        "&:hover": {
            backgroundColor: "#2ed573"
        }
    }
});

function AddToDo(props) {

    const classes = useStyles();

    // Add a to do item
    function AddToDo() {
        props.toDo.push(new ToDo(props.toDo.length, "New task...", false, false));

        props.GlobalState.set({
            toDo: props.toDo
        });
    }

    return (
        <IconButton className={classes.root} onClick={AddToDo}>
            <AddSharpIcon fontSize="large" ></AddSharpIcon>
        </IconButton>
    );
}

export default AddToDo;