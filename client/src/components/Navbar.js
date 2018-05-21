import React from 'react';
import { Link } from 'react-router-dom';

import withSession from '../components/withSession';

const Navbar = ({ auth, username }) => (
  <nav>
    <ul className="App" style={{ display: 'flex', justifyContent: 'space-evenly', listStyle: 'none' }}>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/recipes">Search Recipes</Link></li>
      <li><Link to="/recipe">Add Recipe</Link></li>
      {!auth && <li><Link to="/signin">Sign In</Link></li>}
      {!auth && <li><Link to="/signup">Sign Up</Link></li>}
      {auth && <li><Link to="/profile">Profile</Link></li>}
      {auth && <li><Link to="/signout">Sign Out</Link></li>}
    </ul>
    {username && <h3 className="App">Welcome, {username}</h3>}
  </nav>
);

export default withSession(Navbar);