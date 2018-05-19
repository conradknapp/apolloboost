exports.typeDefs = `
  type Recipe {
    name: String
    description: String
    category: String
    instructions: String
    createdDate: String
  }

  type User {
    username: String!
    password: String!
    email: String!
  }

  type Token {
    token: String!
  }

  type Query {
    getLatestRecipes: [Recipe]
    getAllRecipes: [Recipe]
    getUser(username: String!): User
  }

  type Mutation {
    createRecipe(name: String, category: String, description: String, instructions: String): Recipe
    signinUser(username: String!, password: String!): Token!
    createUser(username: String!, password: String!, email: String!): Token!
  }
`;
