import React from "react";
import { Query, Mutation } from "react-apollo";
import { Link } from "react-router-dom";

import { LIKE_RECIPE, GET_RECIPES, GET_USER } from "../../queries";
import withSession from "../withSession";

class Recipe extends React.Component {
  state = {
    clicked: false
  };

  handleClick = (id, likeRecipe, data) => {
    if (!this.state.clicked || !data.getUser.favorites.includes(id)) {
      likeRecipe();
    }
    this.setState(prevState => ({
      clicked: true
    }));
  };

  update = (cache, { data: { likeRecipe } }) => {
    const { getAllRecipes } = cache.readQuery({ query: GET_RECIPES });
    getAllRecipes.map(
      recipe => (recipe.id === likeRecipe.id ? (recipe.likes += 1) : recipe)
    );

    cache.writeQuery({
      query: GET_RECIPES,
      data: { getAllRecipes }
    });
  };

  render() {
    const {
      id,
      name,
      description,
      instructions,
      category,
      likes,
      username,
      isAuth,
      currentUser
    } = this.props;
    const { clicked } = this.state;

    return (
      <li>
        <Link to={`/recipes/${id}`}>
          <p>Name: {name}</p>
        </Link>
        <p>Category: {category}</p>
        <p>Description: {description}</p>
        <p>Instructions: {instructions}</p>
        <p>Likes: {likes}</p>
        <p>Created by: {username}</p>
        {isAuth && (
          <Mutation
            mutation={LIKE_RECIPE}
            variables={{ id, username }}
            update={this.update}
          >
            {(likeRecipe, { data, loading, error }) => (
              <Query query={GET_USER} variables={{ username: currentUser }}>
                {({ loading, error, data }) => {
                  if (loading) return <div className="App">Loading...</div>;
                  if (error) return <div>Error :(</div>;
                  return (
                    <button
                      disabled={data.getUser.favorites.includes(id) || clicked}
                      onClick={event =>
                        this.handleClick(event, likeRecipe, data)
                      }
                    >
                      {data.getUser.favorites.includes(id) || clicked
                        ? "Liked!"
                        : "Like"}
                    </button>
                  );
                }}
              </Query>
            )}
          </Mutation>
        )}
      </li>
    );
  }
}

export default withSession(Recipe);
