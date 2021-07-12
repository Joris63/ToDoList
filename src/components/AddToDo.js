import ToDo from "../models/ToDo";
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Box } from '@material-ui/core';
import AddSharpIcon from '@material-ui/icons/AddSharp';

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        top: 0,
        left: '35%',
    },

    button: {
        position: 'relative',
        borderRadius: '50%',
        background: 'linear-gradient(to right, #b3ffab, #12fff7)',
        width: '3.5em',
        height: '3.5em',
        zIndex: 1,
        '&::before': {
            position: 'absolute',
            content: '""',
            borderRadius: '50%',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundImage: 'linear-gradient(to left, #b3ffab, #12fff7)',
            zIndex: -1,
            transition: 'opacity 0.2s linear',
            opacity: 0,
        },

        "&:hover::before": {
            opacity: 1,
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
        <Box className={classes.root}>
            <IconButton className={classes.button} onClick={AddToDo}>
                <AddSharpIcon fontSize="large" ></AddSharpIcon>
            </IconButton>
        </Box>
    );
}

export default AddToDo;