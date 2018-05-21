import React from "react";
import jwtDecode from "jwt-decode";

const withSession = PassedComponent => props => {
  const token = localStorage.getItem("token");
  if (token) {
    var { username, exp } = jwtDecode(token);
    var isAuth = exp > Date.now() / 1000;
  }
  return <PassedComponent {...props} currentUser={username} isAuth={isAuth} />;
};

export default withSession;
