const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

router.get('/search', async (req, res) => {
  try {
    const { ingredients } = req.query;

    // Convert the ingredients string into an array
    const ingredientsArray = ingredients.split(',');

    // Find recipes containing all specified ingredients
    const recipes = await Recipe.find({
      'ingredients.name': { $in: ingredientsArray },
    });

    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async(req,res) =>{
  try {
    const recipe = await Recipe.find();
    res.json(recipe);
  } catch (err) {
    res.status(500).send(err);
  }
})

//get by id
router.get("/:id", async (req, res) => {
  try {
    //params cause finding by url
    const recipes = await Recipe.findOne({ id: req.params.id });
    //returns data in json format
    res.json(recipes);
  } catch (err) {
    res.send("Error " + err);
  }
});


module.exports = router; 
