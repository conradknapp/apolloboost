import React from 'react';
import { Mutation } from 'react-apollo';

import { LIKE_RECIPE } from '../../queries';

const handleClick = (id, likeRecipe) => {
  likeRecipe().then(async ({ data }) => {
    console.log(data);
  });
}

const Recipe = ({ id, name, description, instructions, category, likes }) => (
  <li>
    <p>{name}</p>
    <p>{description}</p>
    <p>{instructions}</p>
    <p>{category}</p>
    <p>Likes: {likes}</p>
    <Mutation mutation={LIKE_RECIPE} variables={{ id }} >
      {(likeRecipe, { data, loading, error }) => (
      <button onClick={(id) => handleClick(id, likeRecipe)}>Like</button>
      )}
    </Mutation>
  </li>
)
export default Recipe;