import { gql } from 'apollo-boost';

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

export const CREATE_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;