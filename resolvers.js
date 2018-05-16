const mongoose = require("mongoose");
const Recipe = require("./models/Recipe");
const User = require('./models/User');

exports.resolvers = {
  Query: {
    getAllRecipes: async (root) => {
      const allRecipes = await Recipe.find({});
      return allRecipes;
    }
  },
  Mutation: {
    createUser: async (root, { username, password, email }) => {
      const user = await User.findOne({ email });
      if (user) {
        return "User already exists";
      }
      const newUser = await new User({
        username,
        password,
        email
      });
      return await newUser.save();
    }
  }
}