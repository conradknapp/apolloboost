import React from "react";
import "./App.css";
import { Query } from "react-apollo";

import Recipe from "./Recipe/Recipe";
import { GET_RECIPES } from "../queries";

const App = () => (
  <div className="App">
    <h1>Recipes</h1>
    <Query query={GET_RECIPES}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error :(</div>;
        // console.log(data);
        return (
          <ul>
            {data.getAllRecipes.map(recipe => (
              <Recipe key={recipe._id} {...recipe} />
            ))}
          </ul>
        );
      }}
    </Query>
  </div>
);

export default App;
