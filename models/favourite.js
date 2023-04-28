const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema({
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Recipe",
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User'
  // },
});

const Favourite = mongoose.model("Favourites", favouriteSchema);

module.exports = Favourite;