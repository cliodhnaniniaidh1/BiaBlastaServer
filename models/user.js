// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.Mixed,
        default: [],
      },
    ],
    dayOfWeek: { type: String, required: true },
    recipeId: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Recipe" },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
