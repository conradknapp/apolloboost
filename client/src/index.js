import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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

const Root = () => (
  <Router>
    <React.Fragment>
      <Navbar />
      <Route path="/" exact component={App} />
      <Route path="/recipe" exact component={CreateRecipe} />
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
