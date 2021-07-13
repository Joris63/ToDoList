import React from 'react';
import ToDo from './models/ToDo'

function getItemsFromLocalStorage() {
    if (localStorage.getItem("toDoList") != null) {
        const list = [];

        const savedList = JSON.parse(localStorage.getItem('toDoList'));
        savedList.map(item => list.push(new ToDo(list.length, item.title, item.editable, item.completed)));

        return list;
    }
    else {
        return [];
    }
}

// Initial toDo List
const initialGlobalState = {
    toDo: getItemsFromLocalStorage(),
};

// Create a Context for the (global) State
export const GlobalState = React.createContext();

export default class Global extends React.Component {
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
export const useGlobalState = () => React.useContext(GlobalState);