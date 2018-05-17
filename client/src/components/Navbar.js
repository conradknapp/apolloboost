import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <ul className="App">
    <li><Link to="/">Home</Link></li>
    <li><Link to="/recipes">All Recipes</Link></li>
    <li><Link to="/recipe">Add Recipe</Link></li>
    <li><Link to="/signin">Sign In</Link></li>
    <li><Link to="/signup">Sign Up</Link></li>
  </ul>
);

export default Navbar;