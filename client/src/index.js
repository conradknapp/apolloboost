import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// Import components
import App from './components/App';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import withSession from './components/withSession';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Signout from './components/Auth/Signout';
import Recipes from './components/Recipe/Recipes';
import CreateRecipe from './components/Recipe/CreateRecipe';

// import Apollo packages
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Pass in GraphQL endpoint
const client = new ApolloClient({ uri: 'http://localhost:4444/graphql' });

const authenticateUser = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  } else {
    const decodedToken = jwtDecode(token);
    const notExpired = decodedToken.exp > (Date.now() / 1000);
    return notExpired;
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    authenticateUser() ?
      <Component {...props} {...rest} /> :
      <Redirect to={{
        pathname: '/signin',
        state: { from: props.location }
      }} />
  )} />
);

const Root = ({ session, username, auth }) => (
  <Router>
    <React.Fragment>
      <Navbar session={session} username={username} />
      <Route path="/" exact component={App} />
      <PrivateRoute path="/recipe" component={CreateRecipe} />
      <Route path="/recipes" exact component={Recipes} />
      <Route path="/signin" exact component={Signin} />
      <Route path="/signup" exact component={Signup} />
      <PrivateRoute path="/profile" session={session} username={username} exact component={Profile} />
      <Route path="/signout" exact component={Signout} />
    </React.Fragment>
  </Router>
);

const Application = withSession(Root);

// Wrap App component with ApolloProvider
ReactDOM.render(
  <ApolloProvider client={client}>
    <Application />
  </ApolloProvider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}

registerServiceWorker();
