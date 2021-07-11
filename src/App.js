import Global from './GlobalState';
import { Grid } from '@material-ui/core'
import ToDoList from './components/ToDoList';

function App() {

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item>
        <Global Root={() => <ToDoList />}></Global>
      </Grid>
    </Grid>
  );
}

export default App;