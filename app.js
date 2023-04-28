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

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//   },
//   // mealPlans: {
//   //   dayOfWeek: { type: String, required: true },
//   //   recipeId: [
//   //     { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Recipe" },
//   //   ],
//   //   // timestamps: true,
//   // },
//   // favorites: {
//   //   recipeId: {
//   //     type: mongoose.Schema.Types.ObjectId,
//   //     required: true,
//   //     ref: "Recipe",
//   //   },
//   // }
// });



// // define schema for recipes
// const recipeSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   id: { type: Number, required: true },
//   description: { type: String },
//   catagory: {
//     type: String,
//     require: true,
//   },
//   servingSize: {
//     type: Number,
//     require: true,
//   },
//   ingredients: { name: Array, quantity: String },
//   steps: {
//     type: Array,
//     required: true,
//   },
// });

// const ingredientSchema = new mongoose.Schema({
//   catagories: {
//     type: String,
//     required: true,
//   },
//   ingredients: {
//     type: Array,
//     required: true,
//   },
// });

// const saveSchema = new mongoose.Schema(
//   {
//     dayOfWeek: { type: String, required: true },
//     recipeId: [{ type: Array, required: true, ref: "Ingredient" }],
//   },
//   { timestamps: true }
// );

// const checkboxSchema = new mongoose.Schema({
//   checkboxValue: { type: Boolean, default: false },
// });

// const Checkbox = mongoose.model("Checkbox", checkboxSchema);
// const Favorite = mongoose.model("Favorite", favoriteSchema);
// const MealPlan = mongoose.model("MealPlan", mealPlanSchema);
// const Recipe = mongoose.model("Recipe", recipeSchema);
// // const Ingredient = mongoose.model("Ingredient", ingredientSchema);
// const Save = mongoose.model("Save", saveSchema);
// const User = mongoose.model("User", userSchema);




// app.post("/saveEmail", (req, res) => {
//   // Extract the id_token from the authentication response
//   const idToken = req.body.id_token; // replace with the actual source of your id_token

//   // Verify and decode the id_token
//   jwt.verify(
//     idToken,
//     "3q82ojSwQxsGVX_I7SNNrJkjUbEBBD3xj0f0iw7Y9iQdwTpeSd9fkWrOKb6OAA1u",
//     (err, decoded) => {
//       if (err) {
//         // Handle token verification error
//         console.error(err);
//         // Return an error response to the client
//         res.status(500).send("Failed to verify token");
//       } else {
//         // Extract the user's email from the decoded token
//         const userEmail = decoded.email; // replace with the actual claim name for email

//         // Save the user's email to your database
//         // Use your preferred database client or ORM to perform database operations
//         // For example, if using MongoDB with Mongoose:
//         const User = require(User); // replace with your User model
//         const newUser = new User({ email: userEmail }); // create a new User object with the email
//         newUser.save((err, savedUser) => {
//           if (err) {
//             // Handle database save error
//             console.error(err);
//             // Return an error response to the client
//             res.status(500).send("Failed to save user");
//           } else {
//             // Return a success response to the client
//             res.status(200).send("User saved successfully");
//           }
//         });
//       }
//     }
//   );
//   // // Retrieve the email address from the request body
//   // const { email } = req.body;

//   // // Check if the email already exists in the database
//   // User.findOne({ email }, (err, existingUser) => {
//   //   if (err) {
//   //     // Handle error
//   //     res.status(500).json({ error: "Failed to check email address." });
//   //   } else if (existingUser) {
//   //     // If email already exists, return error response
//   //     res.status(409).json({ error: "Email address already exists." });
//   //   } else {
//   //     // If email does not exist, create a new user object with the email address
//   //     const user = new User({ email });

//   //     // Save the user object to MongoDB
//   //     user
//   //       .save()
//   //       .then(() => {
//   //         // Handle success
//   //         res.status(200).json({ message: "Email address saved successfully." });
//   //       })
//   //       .catch((error) => {
//   //         // Handle error
//   //         res.status(500).json({ error: "Failed to save email address." });
//   //       });
//   //   }
//   // });
// });


app.get("/ingredients", async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    //returns data in json format
    res.json(ingredients);
  } catch (err) {
    res.send("Error " + err);
  }
});

//get by id
app.get("/ingredients/:id", async (req, res) => {
  try {
    //params cause finding by url
    const ingredients = await Ingredient.findById(req.params.id);
    //returns data in json format
    res.json(ingredients);
  } catch (err) {
    res.send("Error " + err);
  }
});

//Post client-side
//add description, ingredient, steps
app.post("/ingredients", async (req, res) => {
  const ingredient = new Ingredient({
    name: req.body.name,
    catagory: req.body.catagory,
  });

  try {
    const i1 = await ingredient.save();
    res.json(i1);
  } catch (err) {
    res.send(err);
  }
});

//update recipe
app.patch("/ingredients/:id", async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    ingredient.sub = req.body.sub;
    const i1 = await ingredient.save();
    res.json(i1);
  } catch (err) {
    //should send status and resposnse
    res.send("Error " + err);
  }
});

//works but have to abort send afterwards
app.delete("/ingredients/:id", async (req, res) => {
  try {
    //params cause finding by url
    const ingredients = await Ingredient.findById(req.params.id);
    //returns data in json format
    ingredients.remove();
  } catch (err) {
    res.send("Error " + err);
  }
});

// define a new route to handle saving of ingredients
app.post("/saved-ingredients", async (req, res) => {
  // try {
  //   const { dayOfWeek, recipeId } = req.body;

  //   // check if the recipes exist
  //   const recipes = await Ingredient.findById(recipeId);
  //   if (!recipes) {
  //     return res.status(404).send("Recipe not found");
  //   }

  //   const mealPlan = new Save({
  //     dayOfWeek,
  //     recipeId,
  //   });

  //   await mealPlan.save();
  //   res.json(mealPlan);
  // } catch (err) {
  //   res.status(500).send(err);
  //   console.log(err);
  // }
  if (req.method === "POST") {
    const { checkboxValue } = JSON.parse(req.body);

    const checkbox = await Checkbox({ checkboxValue });

    try {
      await checkbox.save();
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error saving checkbox to MongoDB" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
});

app.get("/saved-ingredients", async (req, res) => {
  try {
    const mealPlans = await Save.find().populate("recipeId");
    res.json(mealPlans);
    console.log(mealPlans);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put("/saved-ingredients/:id", async (req, res) => {
  const id = req.params.id;

  // find the existing meal plan by id
  let mealPlan = await Save.findById(id);

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

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
