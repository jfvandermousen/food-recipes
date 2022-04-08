const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: {
      type: String,
      required:true
    },
    srcImg: {
      type: String,
      required:false
    },
    cooker: {
      type: String,
      required:true,
    },
    time: {
      type: Number,
      required:true,
    },
    difficulty: {
      type: String,
      required:true,
    },
    tags: {
      type: String,
      required:false,
    },
    description: {
      type: String,
      required:true,
    }
  }, {timestamps: true });
  
  const Recipe = mongoose.model('Recipe', recipeSchema);
  module.exports = Recipe;