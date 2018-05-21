import React from "react";
import "./App.css";
import { Query } from "react-apollo";

// import withSession from "./withSession";
import Recipe from "./Recipe/Recipe";
import { GET_RECIPES } from "../queries";

const App = ({ auth }) => (
  <div className="App">
    <h1>Recipes</h1>
    <Query query={GET_RECIPES}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error :(</div>;
        return (
          <ul>
            {data.getAllRecipes.map(recipe => (
              <Recipe key={recipe.id} {...recipe} />
            ))}
          </ul>
        );
      }}
    </Query>
  </div>
);

export default App;
