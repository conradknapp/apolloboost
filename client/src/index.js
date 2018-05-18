import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// Import components
import App from './components/App';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Recipes from './components/Recipes';
import CreateRecipe from './components/CreateRecipe';
import Navbar from './components/Navbar';

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
    authenticateUser() ? <Component {...props} /> : <Redirect to={{
      pathname: '/signin',
      state: { from: props.location }
    }} />
  )} />
);

const Root = () => (
  <Router>
    <React.Fragment>
      <Navbar />
      <Route path="/" exact component={App} />
      <PrivateRoute path="/recipe" component={CreateRecipe} />
      <Route path="/recipes" exact component={Recipes} />
      <Route path="/signin" exact component={Signin} />
      <Route path="/signup" exact component={Signup} />
    </React.Fragment>
  </Router>
);

// Wrap App component with ApolloProvider
ReactDOM.render(
<ApolloProvider client={client}>
  <Root />
</ApolloProvider>,
document.getElementById('root')
);

registerServiceWorker();
