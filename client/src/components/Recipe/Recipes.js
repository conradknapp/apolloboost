import React from 'react';
import { Query } from 'react-apollo';

import Recipe from './Recipe';
import { GET_RECIPES } from '../../queries';

const Recipes = () => (
  <div className="App">
    <h1>All Recipes</h1>
    <Query query={GET_RECIPES}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error :(</div>;
        return (
          <ul>
            {data.getAllRecipes.map((recipe, id) =>
            <Recipe key={id} {...recipe} />)}
          </ul>
        )
      }}
    </Query>
  </div>
);

export default Recipes;
