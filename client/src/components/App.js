import React, { Component } from 'react';
import './App.css';
import { Query } from 'react-apollo';

import { GET_RECIPES } from '../queries';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>React Recipes</h1>
        <Query query={GET_RECIPES}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error :(</div>;
            console.log(data);
            return <div>Hello world</div>
          }}
        </Query>
      </div>
    );
  }
}

export default App;
