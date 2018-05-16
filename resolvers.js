const mongoose = require("mongoose");
const Recipe = require("./models/Recipe");

exports.resolvers = {
  Query: {
    getAllRecipes: async (root) => {
      const allRecipes = await Recipe.find({});
      return allRecipes;
    }
  }
}