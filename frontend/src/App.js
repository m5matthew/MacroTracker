import './App.css';

import AddMeal from "./AddMeal";

function App() {
  return (
    <div className="App">
      <h1>Welcome, Matthew</h1>
      <button>Add meal</button>
      <button>Add entry</button>

      {/* Change this in the future */}
      <div style={{width: '50%', margin: 'auto'}}>
        <AddMeal/>
      </div>
    </div>
  );
}

export default App;
