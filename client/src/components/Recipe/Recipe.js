import React from 'react';

const Recipe = ({ name, description, instructions, category }) => (
  <li>
    <p>{name}</p>
    <p>{description}</p>
    <p>{instructions}</p>
    <p>{category}</p>
  </li>
)
export default Recipe;