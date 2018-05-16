const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String
  }
});

module.exports = mongoose.model('Recipe', RecipeSchema);