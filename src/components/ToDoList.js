import React from 'react';
import { GlobalState, useGlobalState } from '../GlobalState'
import ToDoItem from "./ToDoItem";
import AddToDo from "./AddToDo";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, List, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    main: {
        width: '20rem',
        padding: '2em',
    },
    title: {
        fontSize: '2em',
        fontWeight: 'bold',
    },
    date: {
        color: '#2f3542',
        fontSize: '2em',
        fontWeight: 'bold',
    },
    month: {
        color: '#57606f',
        fontSize: '1em',
        fontWeight: 700,
    },
    year: {
        fontSize: '1em',
        fontWeigth: 400,
        color: '#747d8c',
    },
    delete: {
        position: 'relative',
        background: 'linear-gradient(to right, #eb3349, #f45c43)',
        zIndex: 1,
        '&::before': {
            position: 'absolute',
            content: '""',
            borderRadius: 4,
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: 'linear-gradient(to right, #f45c43, #eb3349)',
            zIndex: -1,
            transition: 'opacity 0.2s linear',
            opacity: 0,
        },

        "&:hover::before": {
            opacity: 1,
        },
    },
}));


function ToDoList() {

    const classes = useStyles();
    const { toDo } = useGlobalState();

    // Get Current Day, Month and Year
    let newDate = new Date()
    let date = newDate.getDate();
    var months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    let monthIndex = newDate.getMonth();
    let year = newDate.getFullYear();

    function ClearList() {
        GlobalState.set({
            toDo: []
        });
        localStorage.removeItem('toDoList');
    }

    return (
        <Paper className={classes.main}>
            <Grid container spacing={2} direction='column'>
                {/* The header with the current date */}
                <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography className={classes.date}>ToDo List</Typography>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item>
                                    <Typography className={classes.date}>{date}</Typography>
                                </Grid>
                                <Grid item>
                                    <Grid container direction="column" alignItems="center" spacing={0}>
                                        <Grid item>
                                            <Typography className={classes.month}>{months[monthIndex]}</Typography>
                                        </Grid>

                                        <Grid item>
                                            <Typography className={classes.year}>{year}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/* Render all the items using the .map method */}
                <Grid item xs={12}>
                    <List>
                        {toDo.map((todo, index) => (
                            <ToDoItem key={index} todo={todo} toDo={toDo} GlobalState={GlobalState} />
                        ))}
                    </List>
                </Grid>

                {/* The footer of the paper */}
                {toDo.length > 0 ? (
                    <Grid item style={{ marginBottom: 15 }}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="body1">You have {toDo.length} tasks pending</Typography>
                            </Grid>
                            <Grid item >
                                <Button className={classes.delete} onClick={() => ClearList()}>Clear all</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                ) : null}

                {/* The Add ToDo Button */}
                <Grid item style={{ position: 'relative' }}>
                    <AddToDo toDo={toDo} GlobalState={GlobalState} />
                </Grid>

            </Grid>
        </Paper>
    );
}

export default ToDoList;
