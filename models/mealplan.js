const mongoose = require("mongoose");

const mealPlanSchema = new mongoose.Schema(
  {
    dayOfWeek: { type: String, required: true },
    recipeId: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Recipe" },
    ],
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    //   },
  },
  { timestamps: true }
);

const MealPlan = mongoose.model("MealPlan", mealPlanSchema);

module.exports = MealPlan;