import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

// import Apollo packages
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Pass in GraphQL endpoint
const client = new ApolloClient({ uri: 'http://localhost:4444/graphql' });

// Wrap App component with ApolloProvider
ReactDOM.render(
<ApolloProvider client={client}>
  <App />
</ApolloProvider>,
document.getElementById('root')
);

registerServiceWorker();
