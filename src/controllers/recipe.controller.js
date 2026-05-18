const recipeService = require('../services/recipe.service');

const isValidId = (id) => id.match(/^[0-9a-fA-F]{24}$/);

const getAllRecipes = async (req, res, next) => {
  try {
    const recipes = await recipeService.getAllRecipes(req.query);
    res.status(200).json({
      status: 'success',
      count: recipes.length,
      data: recipes,
    });
  } catch (error) {
    next(error);
  }
};

const getRecipeById = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid recipe ID format',
      });
    }
    const recipe = await recipeService.getRecipeById(req.params.id);
    if (!recipe) {
      return res.status(404).json({
        status: 'fail',
        message: 'No recipe found with that ID',
      });
    }
    res.status(200).json({
      status: 'success',
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};

const createRecipe = async (req, res, next) => {
  try {
    const newRecipe = await recipeService.createRecipe(req.body);
    res.status(201).json({
      status: 'success',
      data: newRecipe,
    });
  } catch (error) {
    next(error);
  }
};

const updateRecipe = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid recipe ID format',
      });
    }
    const updatedRecipe = await recipeService.updateRecipe(
      req.params.id,
      req.body
    );
    if (!updatedRecipe) {
      return res.status(404).json({
        status: 'fail',
        message: 'No recipe found with that ID',
      });
    }
    res.status(200).json({
      status: 'success',
      data: updatedRecipe,
    });
  } catch (error) {
    next(error);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid recipe ID format',
      });
    }
    const deleted = await recipeService.deleteRecipe(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        status: 'fail',
        message: 'No recipe found with that ID',
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Recipe deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};