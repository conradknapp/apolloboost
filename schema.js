exports.typeDefs = `
  type Recipe {
    _id: String
    name: String
    description: String
    category: String
    instructions: String
    createdDate: String
    likes: Int
    username: String
  }

  type User {
    _id: String
    username: String!
    password: String!
    email: String!
    joinDate: String!
    favorites: [Favorite]
  }

  type Favorite {
    _id: String
    name: String
    description: String
    category: String
    instructions: String
    createdDate: String
    likes: Int
    username: String
  }

  type Token {
    token: String!
  }

  type Query {
    getRecipe(_id: String): Recipe
    getAllRecipes(searchTerm: String): [Recipe]
    getCreatedRecipes(username: String!): [Recipe]

    getUser(username: String!): User
  }

  type Mutation {
    createRecipe(name: String, category: String, description: String, instructions: String, username: String): Recipe
    likeRecipe(_id: String!, username: String!): Recipe

    signinUser(username: String!, password: String!): Token!
    createUser(username: String!, password: String!, email: String!): Token!
  }
`;
