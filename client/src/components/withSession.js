import React from 'react';
import jwtDecode from 'jwt-decode';

const withSession = PassedComponent => props => {
  const token = localStorage.getItem('token');
  if (token) {
    var { username, exp } = jwtDecode(token);
    var auth = exp > (Date.now() / 1000);
  }
  return <PassedComponent username={username} auth={auth} />
};

export default withSession;