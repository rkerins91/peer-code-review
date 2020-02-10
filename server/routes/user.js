const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const { User } = require("../database");

router.post(
  "/register",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please use a valid email address").isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (errors.length) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email } = req.body;
    try {
      const user = new User({ name, email });
      await user.save();
      res.send(user);
    } catch (err) {
      console.err(err.message);
    }
  }
);

router.post("/:id/experience", (req, res) => {
  // Get language data from body of request, userID from params
  const languages = req.body;
  const user = User.findById(req.params.id);
  try {
    // loop through body of request, setting user experience for each key
    for (let language in languages) {
      user.experience.set(language, languages[language]);
    }
    // send back user
    res.send(user);
  } catch (err) {
    res.send(400);
  }
});

module.exports = router;
