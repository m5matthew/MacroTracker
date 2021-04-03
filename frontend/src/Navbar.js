import { React } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#home">
        MacroTracker
      </a>

      <div className="navbar-nav mr-auto">
        <NavLink exact className="nav-item nav-link" to="/">
          Home
        </NavLink>
        <NavLink exact className="nav-item nav-link" to="/meals">
          Meals
        </NavLink>
        <NavLink exact className="nav-item nav-link" to="/entries">
          Entries
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
