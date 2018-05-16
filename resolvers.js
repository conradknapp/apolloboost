const mongoose = require("mongoose");
const Recipe = require("./models/Recipe");
const User = require('./models/User');
const jwt = require("jsonwebtoken");

const createToken = async (user, secret, expiresIn) => {
  const { email, password } = user;
  return await jwt.sign({ email, password }, secret, { expiresIn });
};

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
        throw new Error('User already exists');
      }
      const newUser = await new User({
        username,
        password,
        email
      }).save();
      return { token: createToken(newUser, process.env.JWT_KEY, "1h") };
    }
  }
}