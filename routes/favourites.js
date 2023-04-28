const express = require("express");
const router = express.Router();
const Favourite = require("../models/favourite");
const Recipe = require("../models/recipe");

router.delete("/:id", async (req, res) => {
  try {
    const favouriteId = req.params.id;
    const deletedFavourite = await Favourite.findOneAndDelete(favouriteId);
    if (!deletedFavourite) {
      return res.status(404).send("Favourite not found");
    }
    res.json({ message: "Favourite deleted successfully" });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const { recipeId } = req.body;

    const recipe = await Recipe.findOne({ id: recipeId });
    if (!recipe) {
      return res.status(404).send("Recipe not found");
    }

    const favourite = new Favourite({
      recipeId: recipe._id,
      // user: req.user.sub,
    });
    await favourite.save();
    res.json(favourite);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/", async (req, res) => {
  try {
    // {user: req.user.sub}
    const favourites = await Favourite.find().populate({
      path: "recipeId",
      select: "name id",
    });
    res.json(favourites);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // {user: req.user.sub}
    const favourites = await Favourite.find().populate({
      path: "recipeId",
      select: "name id",
    });
    res.json(favourites);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;