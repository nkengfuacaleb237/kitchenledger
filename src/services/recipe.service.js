const Recipe = require('../models/recipe.model');

const getAllRecipes = async (filterParams) => {
  const query = {};

  if (filterParams.category) {
    query.category = filterParams.category;
  }

  const recipes = await Recipe.find(query);
  return recipes;
};

const getRecipeById = async (recipeId) => {
  const recipe = await Recipe.findById(recipeId);
  return recipe;
};

const createRecipe = async (recipeData) => {
  if (recipeData.cookingTime <= 0) {
    throw new Error('Cooking time must be a positive number');
  }

  const newRecipe = new Recipe(recipeData);
  const savedRecipe = await newRecipe.save();
  return savedRecipe;
};

const updateRecipe = async (recipeId, updateData) => {
  if (updateData.cookingTime !== undefined && updateData.cookingTime <= 0) {
    throw new Error('Cooking time must be a positive number');
  }

  const updatedRecipe = await Recipe.findByIdAndUpdate(
    recipeId,
    updateData,
    { new: true, runValidators: true }
  );
  return updatedRecipe;
};

const deleteRecipe = async (recipeId) => {
  const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
  return deletedRecipe;
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};