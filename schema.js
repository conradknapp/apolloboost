exports.typeDefs = `
  type Recipe {
    _id: ID
    name: String
    description: String
    category: String
  }

  type Query {
    getAllRecipes: [Recipe]
  }
`;
