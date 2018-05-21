import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

// Import components
import App from "./components/App";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import Signout from "./components/Auth/Signout";
import RecipePage from "./components/Recipe/RecipePage";
import Recipes from "./components/Recipe/Recipes";
import CreateRecipe from "./components/Recipe/CreateRecipe";

// import Apollo packages
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// Pass in GraphQL endpoint
const client = new ApolloClient({ uri: "http://localhost:4444/graphql" });

// Checks whether user is authenticated
const authenticateUser = () => {
  let isAuth;
  const token = localStorage.getItem("token");
  if (!token) {
    isAuth = false;
  } else {
    const { exp } = jwtDecode(token);
    isAuth = exp > Date.now() / 1000;
  }
  return isAuth;
};

// Makes sure user is authenticated before accessing a route
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticateUser() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

// Root component - Where all routing is located
const Root = () => (
  <Router>
    <React.Fragment>
      <Route path="/" component={Navbar} />
      <Route path="/" exact component={App} />
      <PrivateRoute path="/recipe" exact component={CreateRecipe} />
      <Route path="/recipes" exact component={Recipes} />
      <Route path="/recipes/:_id" exact component={RecipePage} />
      <PrivateRoute path="/profile" exact component={Profile} />
      <Route path="/signin" exact component={Signin} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/signout" exact component={Signout} />
    </React.Fragment>
  </Router>
);

// Wrap App component with ApolloProvider
ReactDOM.render(
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}

registerServiceWorker();
