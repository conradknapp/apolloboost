exports.typeDefs = `
  type Recipe {
    id: String
    name: String
    description: String
    category: String
    instructions: String
    createdDate: String
    likes: Int
    username: String
  }

  type User {
    username: String!
    password: String!
    email: String!
    joinDate: String!
    favorites: [String]
  }

  type Token {
    token: String!
  }

  type Query {
    getRecipe(id: String): Recipe
    getAllRecipes(searchTerm: String): [Recipe]
    getCreatedRecipes(username: String!): [Recipe]

    getUser(username: String!): User
  }

  type Mutation {
    createRecipe(name: String, category: String, description: String, instructions: String, username: String): Recipe
    likeRecipe(id: String!, username: String!): Recipe

    signinUser(username: String!, password: String!): Token!
    createUser(username: String!, password: String!, email: String!): Token!
  }
`;
