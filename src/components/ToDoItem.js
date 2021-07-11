import React from 'react';
import { makeStyles, createTheme, ListItem, ListItemIcon, Checkbox, ListItemText, TextField, ListItemSecondaryAction, IconButton, ThemeProvider } from '@material-ui/core';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import { green } from '@material-ui/core/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: green[500],
        },
    },
});

const useStyles = makeStyles({
    item: {
        paddingTop: 10,
        paddingBottom: 10,
        '&:hover': {
            background: '#dfe4ea',
            '& $delete': {
                visibility: 'visible'
            }
        },
    },
    crossedOut: {
        textDecoration: 'line-through',
        color: '#a4b0be',
    },
    delete: {
        visibility: 'hidden',
        position: 'absolute',
        top: -25,
        right: -25,
        borderRadius: '50%',
        background: '#ff6b81',
        '&:hover': {
            background: '#ff4757',
        }
    },
});

function ToDoItem(props) {

    const classes = useStyles();
    const labelId = `checkbox-list-label-${props.todo.id}`;
    const [checked, setChecked] = React.useState([0]);


    // Edit the status of the to do item
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        ChangeToDoStatus();

        setChecked(newChecked);
    };

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
        <ListItem dense className={classes.item}>
            {!props.todo.editable ? (
                <ListItemIcon>
                    <ThemeProvider theme={theme}>
                        <Checkbox
                            color="primary"
                            edge="start"
                            checked={props.todo.completed}
                            id={"checkbox" + props.todo.id}
                            tabIndex={-1}
                            disableRipple
                            onClick={handleToggle(props.todo.id)}
                        />
                    </ThemeProvider>
                </ListItemIcon>
            ) : null}

            {/* Shows either the paragraph or the input depending on if it's editable */}
            {!props.todo.editable ? (
                <ListItemText className={props.todo.completed ? classes.crossedOut : ""} id={labelId} primary={props.todo.title} />
            ) : (
                <TextField id={"input" + props.todo.id} label="Title" defaultValue={props.todo.title} size="small" />
            )
            }


            {/* The delete button shows up on hover over a todo item  */}
            <IconButton className={classes.delete} onClick={() => DeleteToDo()} >
                <DeleteForeverSharpIcon fontSize="small" />
            </IconButton>

            <ListItemSecondaryAction>
                {/* Show the edit button if the to do is not editable */}
                {!props.todo.editable ? (
                    <IconButton style={{ marginRight: 5 }} edge="end" onClick={() => EditTitle(true)} >
                        <EditSharpIcon />
                    </IconButton>
                ) : (
                    <ThemeProvider theme={theme}>
                        <IconButton color="primary" onClick={() => EditToDo()} >
                            <CheckSharpIcon />
                        </IconButton>
                        <IconButton edge="end" color="secondary" onClick={() => EditTitle(false)} >
                            <ClearSharpIcon />
                        </IconButton>
                    </ThemeProvider>
                )}
            </ListItemSecondaryAction>

        </ListItem>
    );
}

export default ToDoItem;
