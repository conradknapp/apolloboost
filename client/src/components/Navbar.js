import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const initialState = {
  auth: null,
  username: null
};

class Navbar extends React.Component {
  state = { ...initialState };

  componentDidMount() {
    this.authenticateUser();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname) {
      this.authenticateUser();
    }
  }

  clearState = () => {
    this.setState({ ...initialState });
  }

  authenticateUser = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      this.setState({ auth: false });
      this.clearState();
    } else {
      const decodedToken = jwtDecode(token);
      const notExpired = decodedToken.exp > (Date.now() / 1000);
      if (notExpired) {
        this.setState({
          auth: notExpired,
          username: decodedToken.username
        });
      }
    }
  }

  render() {
    const { auth, username } = this.state;
    // console.log(this.props);
    return (
      <nav>
      <ul className="App" style={{ display: 'flex', justifyContent: 'space-evenly', listStyle: 'none' }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/recipes">All Recipes</Link></li>
        <li><Link to="/recipe">Add Recipe</Link></li>
        {!auth && <li><Link to="/signin">Sign In</Link></li>}
        {!auth && <li><Link to="/signup">Sign Up</Link></li>}
        {auth && <li><Link to="/profile">Profile</Link></li>}
        {auth && <li><Link to="/signout">Sign Out</Link></li>}
      </ul>
        {username && <h3 className="App">Hello {username}</h3>}
      </nav>
    );
  }
};

export default withRouter(Navbar);