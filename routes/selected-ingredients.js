const express = require('express');
const router = express.Router();
const Ingredient = require('../models/ingredient');

router.post('/', async (req, res) => {
  const { ingredients } = req.body;

  try {
    const newIngredients = ingredients.map((name) => ({ name }));
    const savedIngredients = await Ingredient.insertMany(newIngredients);
    res.status(201).json(savedIngredients);
  } catch (error) {
    res.status(500).json({ message: 'Error saving ingredients' });
  }
});

module.exports = router;