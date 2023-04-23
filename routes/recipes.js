const express = require('express');
const router = express.Router();
const Ingredient = require('../models/ingredient');
const Recipe = require('../models/recipe');

router.get('/search', async (req, res) => {
  try {
    // Retrieve the saved ingredients from the database
    const ingredients = await Ingredient.find();

    // Search for recipes using the retrieved ingredients
    const recipes = await searchRecipes(ingredients);

    // Send the recipes as a response
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error searching for recipes' });
  }
});

// get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    //returns data in json format
    res.json(recipes);
  } catch (err) {
    res.send("Error " + err);
  }
});

//get by id
router.get("/:id", async (req, res) => {
  try {
    //params cause finding by url
    const recipes = await Recipe.findOne({ id: req.params.id });
    //await Recipe.findById(req.params.id);
    //returns data in json format
    res.json(recipes);
  } catch (err) {
    res.send("Error " + err);
  }
});

async function searchRecipes(ingredients) {
  const ingredientNames = ingredients.map((ingredient) => ingredient.name);
  const recipes = await Recipe.find({ ingredients: { $in: ingredientNames } });
  return recipes;
}

module.exports = router; 
