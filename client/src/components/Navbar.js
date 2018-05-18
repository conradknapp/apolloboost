import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

class Navbar extends React.Component {
  state = {
    auth: null
  };

  componentDidMount() {
    this.authenticateUser();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname) {
      this.authenticateUser();
    }
  }

  authenticateUser = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      this.setState(() => {
        return { auth: false };
      });
    } else {
      const decodedToken = jwtDecode(token);
      const notExpired = decodedToken.exp > (Date.now() / 1000);
      this.setState(() => {
        return { auth: notExpired }
      });
    }
  }

  render() {
    const { auth } = this.state;
    return (
      <ul className="App" style={{ display: 'flex', justifyContent: 'space-evenly', listStyle: 'none' }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/recipes">All Recipes</Link></li>
        <li><Link to="/recipe">Add Recipe</Link></li>
        {!auth && <li><Link to="/signin">Sign In</Link></li>}
        {!auth && <li><Link to="/signup">Sign Up</Link></li>}
        {auth && <li><Link to="/signout">Sign Out</Link></li>}
      </ul>
    );
  }
};

export default withRouter(Navbar);