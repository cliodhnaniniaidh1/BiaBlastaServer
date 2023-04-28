const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
app.use(express.json());

app.use(cors({ origin: "http://localhost:3000" }));

const ingredientsRoute = require('./routes/selected-ingredients');
const recipesRoute = require('./routes/recipes');
const usersRoute = require('./routes/users');
const favouriteRoute = require('./routes/favourites');
const mealPlanRoute = require('./routes/mealplans');

// connect to MongoDB database
dotenv.config(); // Load environment variables

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Failed to connect to MongoDB Atlas", err));

  app.use('/selected-ingredients', ingredientsRoute);
  app.use('/recipes', recipesRoute);
  app.use('/favourite', favouriteRoute);
  app.use('/mealplan', mealPlanRoute);
  app.use('/users', usersRoute);

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
