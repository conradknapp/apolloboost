import React from 'react';
import jwtDecode from 'jwt-decode';

const token = localStorage.getItem('token') ;

const withSession = Component => props => (
  token ?
    <Component {...props} session={token} username={jwtDecode(token).username} /> :
    <Component {...props} />
);

export default withSession;