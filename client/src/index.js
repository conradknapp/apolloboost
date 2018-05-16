import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// Import components
import App from './components/App';
import Signup from './components/Signup';

// import Apollo packages
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Pass in GraphQL endpoint
const client = new ApolloClient({ uri: 'http://localhost:4444/graphql' });

const Root = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/signup" component={Signup} />
    </Switch>
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
