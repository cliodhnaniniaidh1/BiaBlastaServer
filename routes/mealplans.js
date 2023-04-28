const express = require('express');
const router = express.Router();
const MealPlan = require('../models/mealplan');
const Recipe = require('../models/recipe');

router.get("/", async (req, res) => {
    try {
      // {user: req.user.sub}
      const mealPlans = await MealPlan.find().populate("recipeId");
      res.json(mealPlans);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  // create meal plan
  router.post("/", async (req, res) => {
    try {
      const { dayOfWeek, recipeId } = req.body;
  
      // check if the recipes exist
      const recipes = await Recipe.findById(recipeId);
      if (!recipes) {
        return res.status(404).send("Recipe not found");
      }
  
      const mealPlan = new MealPlan({
        // user: req.user.sub,
        dayOfWeek,
        recipeId,
      });
  
      await mealPlan.save();
      res.json(mealPlan);
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
    }
  });
  
  // define a route to handle updates
  router.put("/:id", async (req, res) => {
    const id = req.params.id;
  
    // find the existing meal plan by id
    let mealPlan = await MealPlan.findById(id);
  
    if (!mealPlan) {
      return res.status(404).send({ error: "Meal plan not found" });
    }
  
    // update the fields you want to change
    mealPlan.dayOfWeek = req.body.dayOfWeek;
    mealPlan.recipeId = req.body.recipeId;
  
    // save the updated meal plan
    try {
      mealPlan = await mealPlan.save();
      res.send(mealPlan);
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Failed to update meal plan" });
    }
  });

  module.exports = router; 