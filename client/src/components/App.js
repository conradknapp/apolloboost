import React, { Component } from 'react';
import './App.css';
import { Query } from 'react-apollo';

import { LATEST_RECIPES } from '../queries';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Latest Recipes</h1>
        <Query query={LATEST_RECIPES}>
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