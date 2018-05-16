import { gql } from 'apollo-boost';

/* Recipes Queries */
export const GET_RECIPES = gql`
  query {
    getAllRecipes {
      _id
      name
      description
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