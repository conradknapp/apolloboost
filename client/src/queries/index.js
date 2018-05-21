import { gql } from "apollo-boost";

/* Recipes Queries */
export const GET_RECIPE = gql`
  query($id: String) {
    getRecipe(id: $id) {
      id
      name
      description
      category
      instructions
      createdDate
      likes
    }
  }
`;

export const GET_RECIPES = gql`
  query($searchTerm: String) {
    getAllRecipes(searchTerm: $searchTerm) {
      id
      name
      description
      category
      instructions
      createdDate
      likes
      username
    }
  }
`;

export const GET_CREATED_RECIPES = gql`
  query($username: String!) {
    getCreatedRecipes(username: $username) {
      id
      name
      likes
      createdDate
    }
  }
`;

export const LATEST_RECIPES = gql`
  query {
    getLatestRecipes {
      id
      name
      description
      category
      instructions
      createdDate
      likes
    }
  }
`;

export const CREATE_RECIPE = gql`
  mutation(
    $name: String
    $description: String
    $instructions: String
    $category: String
    $username: String
  ) {
    createRecipe(
      name: $name
      description: $description
      instructions: $instructions
      category: $category
      username: $username
    ) {
      id
      name
      description
      instructions
      createdDate
      category
      username
    }
  }
`;

export const LIKE_RECIPE = gql`
  mutation($id: String!) {
    likeRecipe(id: $id) {
      id
      likes
      name
      category
      instructions
      description
    }
  }
`;

/* User Queries */
export const GET_USER = gql`
  query($username: String!) {
    getUser(username: $username) {
      username
      email
      joinDate
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

export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;
