exports.typeDefs = `
  type Recipe {
    _id: ID
    name: String
    description: String
    category: String
    instructions: String
    createdDate: String
    likes: Int
    username: String
  }

  type User {
    _id: ID
    username: String!
    password: String!
    email: String!
    joinDate: String!
    favorites: [Favorite]
  }

  type Favorite {
    _id: ID
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
    getRecipe(_id: ID): Recipe
    getAllRecipes(searchTerm: String): [Recipe]
    getCreatedRecipes(username: String!): [Recipe]

    getUser(username: String!): User
  }

  type Mutation {
    createRecipe(name: String, category: String, description: String, instructions: String, username: String): Recipe
    likeRecipe(_id: ID!, username: String!, liked: Boolean!, prevLiked: Boolean!): Recipe

    signinUser(username: String!, password: String!): Token!
    createUser(username: String!, password: String!, email: String!): Token!
  }
`;
