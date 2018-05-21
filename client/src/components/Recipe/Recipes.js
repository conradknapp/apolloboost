import React from "react";
import { ApolloConsumer } from "react-apollo";

import Recipe from "./Recipe";
import { GET_RECIPES } from "../../queries";

class Recipes extends React.Component {
  state = {
    recipes: []
  };

  render() {
    const { recipes } = this.state;
    return (
      <ApolloConsumer>
        {client => (
          <div className="App">
            <input
              type="search"
              name="searchTerm"
              placeholder="Search for Recipes"
              onChange={async event => {
                event.persist();
                const { data } = await client.query({
                  query: GET_RECIPES,
                  variables: { searchTerm: event.target.value }
                });
                this.setState({
                  recipes: data.getAllRecipes
                });
                // console.log(data);
              }}
            />
            <ul className="App">
              {recipes.map(recipe => <Recipe key={recipe._id} {...recipe} />)}
            </ul>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default Recipes;
