const mongoose = require("mongoose");
const Recipe = require("./models/Recipe");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = async (user, secret, expiresIn) => {
  const { username, password } = user;
  return await jwt.sign({ username, password }, secret, { expiresIn });
};

exports.resolvers = {
  Query: {
    getRecipe: async (root, { id }) => {
      return await Recipe.findOne({ id });
    },
    getLatestRecipes: async root => {
      const latestRecipes = await Recipe.find()
        .sort({ createdDate: "desc" })
        .limit(1);
      return latestRecipes;
    },
    getAllRecipes: async (root, { searchTerm }) => {
      if (searchTerm) {
        return Recipe.find({ $text: { $search: searchTerm } }).sort({
          likes: "desc"
        });
      } else {
        return await Recipe.find().sort({ createdDate: "desc" });
      }
    },
    getCreatedRecipes: async (root, { username }) => {
      const createdRecipes = await Recipe.find({ username });
      return createdRecipes;
    },
    getUser: async (root, { username }) => {
      const user = await User.findOne({ username });
      return user;
    }
  },
  Mutation: {
    createRecipe: async (
      root,
      { name, description, instructions, category, username }
    ) => {
      const newRecipe = new Recipe({
        name,
        description,
        category,
        instructions,
        username
      }).save();
      return newRecipe;
    },
    likeRecipe: async (root, { id }) => {
      const recipe = await Recipe.findOneAndUpdate(
        { id },
        { $inc: { likes: 1 } }
      );
      return recipe;
    },
    signinUser: async (root, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("No user found");
      }
      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (passwordsMatch) {
        return { token: createToken(user, process.env.JWT_KEY, "1h") };
      } else {
        throw new Error("Please fix your username or password");
      }
    },
    createUser: async (root, { username, password, email }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("User already exists");
      }
      const newUser = await new User({
        username,
        password,
        email
      }).save();
      return { token: createToken(newUser, process.env.JWT_KEY, "1h") };
    }
  }
};
