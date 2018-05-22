import React from "react";
import { Query, Mutation } from "react-apollo";
import { Link } from "react-router-dom";

// add like -> liked === true && not previously liked (liked === true && prevLiked === false)
// remove like -> liked === false && not previously liked (liked === false && prevLiked === false)
// remove like -> liked === true && previously liked (liked === true && prevLiked === true)

import { LIKE_RECIPE, GET_RECIPES, GET_USER } from "../../queries";
import withSession from "../withSession";
import RecipeButton from "./RecipeButton";

class Recipe extends React.Component {
  state = {
    liked: false,
    prevLiked: null
  };

  onChildMount = prevLiked => {
    this.setState({ prevLiked });
  };

  handleClick = likeRecipe => {
    this.setState(
      prevState => ({
        liked: !prevState.liked
      }),
      () => likeRecipe()
    );
  };

  update = (cache, { data: { likeRecipe } }) => {
    const { liked, prevLiked } = this.state;
    const { getAllRecipes } = cache.readQuery({ query: GET_RECIPES });

    if ((liked === true && !prevLiked) || (!liked && prevLiked)) {
      getAllRecipes.map(
        recipe => (recipe._id === likeRecipe._id ? (recipe.likes += 1) : recipe)
      );
    } else if ((!liked && !prevLiked) || (liked && prevLiked)) {
      getAllRecipes.map(
        recipe => (recipe._id === likeRecipe._id ? (recipe.likes -= 1) : recipe)
      );
    }

    cache.writeQuery({
      query: GET_RECIPES,
      data: {
        getAllRecipes
      }
    });
  };

  render() {
    const {
      _id,
      name,
      description,
      instructions,
      category,
      likes,
      username,
      isAuth,
      currentUser
    } = this.props;
    const { liked, prevLiked } = this.state;
    console.log(this.state);

    return (
      <li>
        <Link to={`/recipes/${_id}`}>
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
            variables={{ _id, username, liked, prevLiked }}
            update={this.update}
          >
            {(likeRecipe, { data, loading, error }) => (
              <Query query={GET_USER} variables={{ username: currentUser }}>
                {({ loading, error, data }) => {
                  if (loading) return <div className="App">Loading...</div>;
                  if (error) return <div>Error :(</div>;

                  return (
                    <RecipeButton
                      data={data}
                      likeRecipe={likeRecipe}
                      _id={_id}
                      prevLiked={prevLiked}
                      onChildMount={this.onChildMount}
                      handleClick={this.handleClick}
                    />
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
