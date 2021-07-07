import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import AddEntry from "./AddEntry";
import AddMeal from "./AddMeal";
import Navbar from "./Navbar";
import Home from "./Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/meals">
            <div style={{ width: "50%", margin: "auto" }}>
              <AddMeal />
            </div>
          </Route>
          <Route path="/entries">
            <div style={{ width: "50%", margin: "auto" }}>
              <AddEntry />
            </div>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
