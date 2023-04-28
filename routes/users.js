const express = require("express");
const router = express.Router();
const User = require("../models/user");

const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

// Auth0 middleware to check and validate access tokens
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});

router.post("/", checkJwt, async (req, res) => {
  const { user } = req;

  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: "Email is required" });
    return;
  }

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      await User.create({ email, favorites: [] });
    }

    res.status(200).json({ message: "User saved successfully" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Failed to save user" });
  }
});

router.get("/", async (req, res) => {
  try {
    // {user: req.user.sub}
    const mealPlans = await User.find().populate("recipeId");
    res.json(mealPlans);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;