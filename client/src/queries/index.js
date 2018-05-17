import { gql } from 'apollo-boost';

/* Recipes Queries */
export const GET_RECIPES = gql`
  query {
    getAllRecipes {
      name
      description
      category
      instructions
      createdDate
    }
  }
`;

export const LATEST_RECIPES = gql`
  query {
    getLatestRecipes {
      name
      description
      category
      instructions
      createdDate
    }
  }
`;

export const CREATE_RECIPE = gql`
  mutation($name: String, $description: String, $instructions: String, $category: String) {
    createRecipe(name: $name, description: $description, instructions: $instructions, category: $category) {
      name
      description
      instructions
      createdDate
      category
    }
  }
`;

/* User Queries */
export const CREATE_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;