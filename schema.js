exports.typeDefs = `
  type Recipe {
    _id: ID
    name: String
    description: String
    category: String
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
    getAllRecipes: [Recipe]
  }

  type Mutation {
    signinUser(username: String!, password: String!): Token!
    createUser(username: String!, password: String!, email: String!): Token!
  }
`;
