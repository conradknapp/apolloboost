import React from "react";
import { Link } from "react-router-dom";

import withSession from "../components/withSession";

const Navbar = ({ isAuth, currentUser }) => (
  <nav>
    <ul
      className="App"
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        listStyle: "none"
      }}
    >
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/recipes">Search Recipes</Link>
      </li>
      <li>
        <Link to="/recipe">Add Recipe</Link>
      </li>
      {!isAuth && (
        <li>
          <Link to="/signin">Sign In</Link>
        </li>
      )}
      {!isAuth && (
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      )}
      {isAuth && (
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      )}
      {isAuth && (
        <li>
          <Link to="/signout">Sign Out</Link>
        </li>
      )}
    </ul>
    {currentUser && <h3 className="App">Welcome, {currentUser}</h3>}
  </nav>
);

export default withSession(Navbar);
