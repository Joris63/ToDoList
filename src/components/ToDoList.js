import React from 'react';
import { GlobalState, useGlobalState } from '../GlobalState'
import ToDoItem from "./ToDoItem";
import AddToDo from "./AddToDo";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, List } from '@material-ui/core';

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

                {/* The Add ToDo Button */}
                <Grid item style={{ position: 'relative' }}>
                    <AddToDo toDo={toDo} GlobalState={GlobalState} />
                </Grid>
            </Grid>
        </Paper>
    );
}

export default ToDoList;
