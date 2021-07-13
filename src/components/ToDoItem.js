import React from 'react';
import { makeStyles, createTheme, ListItem, ListItemIcon, Checkbox, ListItemText, TextField, ListItemSecondaryAction, IconButton, ThemeProvider } from '@material-ui/core';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import { green, orange } from '@material-ui/core/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: green[500],
        },
    },
});

const theme2 = createTheme({
    palette: {
        primary: {
            main: orange[500],
        },
    },
});

const inputTheme = createTheme({
    palette: {
        primary: {
            main: '#2f3542',
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
        props.toDo[findIndexOfItem()].MakeEditable(state);

        props.GlobalState.set({
            toDo: props.toDo
        });
        SaveChangesToLocalStorage();
    }

    // Edit the title of the actual item
    function EditToDo() {
        props.toDo[findIndexOfItem()].ChangeTitle(document.getElementById("input" + props.todo.id).value);

        props.GlobalState.set({
            toDo: props.toDo
        });
        SaveChangesToLocalStorage();
        EditTitle(false);
    }

    // Edit the status of the to do item
    function ChangeToDoStatus() {
        props.toDo[findIndexOfItem()].ChangeStatus(document.getElementById("checkbox" + props.todo.id).checked);

        props.GlobalState.set({
            toDo: props.toDo
        });
        SaveChangesToLocalStorage();
    }

    // Delete the to do item
    function DeleteToDo() {
        props.toDo.splice(findIndexOfItem(), 1);

        props.GlobalState.set({
            toDo: props.toDo
        });
        SaveChangesToLocalStorage();
    }

    function findIndexOfItem() {
        for (var i = props.toDo.length - 1; i >= 0; --i) {
            if (props.toDo[i].id === props.todo.id) {
                return i;
            }
        }
    }

    function SaveChangesToLocalStorage() {
        var values = [];
        var oneday = new Date();
        oneday.setHours(oneday.getHours() + 24);
        values.push(JSON.stringify(props.toDo));
        values.push(oneday);

        localStorage.setItem('toDoList', values.join(";"));
    }

    return (
        <ThemeProvider theme={inputTheme}>
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
                    <TextField color="primary" id={"input" + props.todo.id} label="Title" defaultValue={props.todo.title} size="small" />
                )}

                <ListItemSecondaryAction>

                    {/* Show different buttons depending on if the to do is not editable */}
                    {!props.todo.editable ? (
                        <ThemeProvider theme={theme2}>
                            {/* The edit button  */}
                            <IconButton style={{ marginRight: 5 }} color="primary" edge="end" onClick={() => EditTitle(true)} >
                                <EditSharpIcon />
                            </IconButton>

                            {/* The delete button  */}
                            <IconButton className={classes.delete} color="secondary" onClick={() => DeleteToDo()} >
                                <DeleteForeverSharpIcon fontSize="small" />
                            </IconButton>
                        </ThemeProvider>
                    ) : (
                        <ThemeProvider theme={theme}>
                            {/* The confirm button  */}
                            <IconButton color="primary" onClick={() => EditToDo()} >
                                <CheckSharpIcon />
                            </IconButton>

                            {/* The cancel button  */}
                            <IconButton edge="end" color="secondary" onClick={() => EditTitle(false)} >
                                <ClearSharpIcon />
                            </IconButton>
                        </ThemeProvider>
                    )}
                </ListItemSecondaryAction>
            </ListItem>
        </ThemeProvider>
    );
}

export default ToDoItem;