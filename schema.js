exports.typeDefs = `
  type Recipe {
    id: String
    name: String
    description: String
    category: String
    instructions: String
    createdDate: String
    likes: Int
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
    getRecipe(id: String): Recipe
    getLatestRecipes: [Recipe]
    getAllRecipes(searchTerm: String): [Recipe]

    getUser(username: String!): User
  }

  type Mutation {
    createRecipe(name: String, category: String, description: String, instructions: String): Recipe
    likeRecipe(id: String!): Recipe

    signinUser(username: String!, password: String!): Token!
    createUser(username: String!, password: String!, email: String!): Token!
  }
`;
