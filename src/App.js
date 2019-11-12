import React, {Fragment} from 'react';
import './App.css';
import Todo from './components/Todo';
function App() {
  return (
    <div className="App">
      {<Fragment>
        <Todo/>
      </Fragment>}
    </div>
  );
}

export default App;
