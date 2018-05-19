import React from 'react';
import './App.css';
import { Query } from 'react-apollo';

import Recipe from './Recipe/Recipe';
import { LATEST_RECIPES } from '../queries';

const App = () => (
  <div className="App">
    <h1>Latest Recipes</h1>
    <Query query={LATEST_RECIPES}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error :(</div>;
        console.log(data);
        return (
          <ul>
            {data.getLatestRecipes.map((recipe) =>
            <Recipe key={recipe.id} {...recipe} />)}
          </ul>
        )
      }}
    </Query>
  </div>
);

export default App;