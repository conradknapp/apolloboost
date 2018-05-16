const mongoose = require("mongoose");
const Recipe = require("./models/Recipe");
const User = require('./models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const createToken = async (user, secret, expiresIn) => {
  const { username, password } = user;
  return await jwt.sign({ username, password }, secret, { expiresIn });
};

exports.resolvers = {
  Query: {
    getAllRecipes: async (root) => {
      const allRecipes = await Recipe.find({});
      return allRecipes;
    }
  },
  Mutation: {
    signinUser: async (root, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('No user found');
      }
      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (passwordsMatch) {
        return { token: createToken(user, process.env.JWT_KEY, "1h") };
      } else {
        throw new Error('Please fix your username or password');
      }
    },
    createUser: async (root, { username, password, email }) => {
      const user = await User.findOne({ username });
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