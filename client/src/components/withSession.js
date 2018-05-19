import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';

const token = localStorage.getItem('token');

const authenticateUser = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  } else {
    const decodedToken = jwtDecode(token);
    const notExpired = decodedToken.exp > (Date.now() / 1000);
    return notExpired;
  }
};

const withSession = PassedComponent => (
  class extends Component {
    render() {
      return (
        token ? <PassedComponent username={jwtDecode(token).username} session={token} auth={authenticateUser()} /> : <PassedComponent />
      )
    }
  }
)
// const withSession = Component => props => (
//   token ?
//     <Component {...props} session={token} username={jwtDecode(token).username} auth={authenticateUser()} /> :
//     <Component {...props} />
// );

export default withSession;