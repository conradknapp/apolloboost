import React from "react";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";

import { LIKE_RECIPE, GET_RECIPES } from "../../queries";
import withSession from "../withSession";

const handleClick = (id, likeRecipe) => {
  likeRecipe();
};

const update = (cache, { data: { likeRecipe } }) => {
  const { getAllRecipes } = cache.readQuery({ query: GET_RECIPES });
  getAllRecipes.map(
    recipe => (recipe.id === likeRecipe.id ? (recipe.likes += 1) : recipe)
  );

  cache.writeQuery({
    query: GET_RECIPES,
    data: { getAllRecipes }
  });
};

const Recipe = ({
  id,
  name,
  description,
  instructions,
  category,
  likes,
  auth,
  username
}) => (
  <li>
    <Link to={`/recipes/${id}`}>
      <p>Name: {name}</p>
    </Link>
    <p>Category: {category}</p>
    <p>Description: {description}</p>
    <p>Instructions: {instructions}</p>
    <p>Likes: {likes}</p>
    <p>Created by: {username}</p>
    {auth && (
      <Mutation mutation={LIKE_RECIPE} variables={{ id }} update={update}>
        {(likeRecipe, { data, loading, error }) => (
          <button onClick={event => handleClick(event, likeRecipe)}>
            Like
          </button>
        )}
      </Mutation>
    )}
  </li>
);
export default withSession(Recipe);
