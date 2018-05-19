const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid');

const RecipeSchema = new Schema({
  id: {
    type: String,
    default: uuid.v1
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  instructions: {
    type: String
  },
  category: {
    type: String
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  }
});

RecipeSchema.index({
  "$**": "text"
});

module.exports = mongoose.model('Recipe', RecipeSchema);