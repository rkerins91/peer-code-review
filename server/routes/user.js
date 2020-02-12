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

router.put("/:id/experience", async (req, res) => {
  // Get language data from body of request, userID from params
  const languages = { ...req.body };
  const user = await User.findById(req.params.id);
  try {
    const languagesToSet = {};
    for (let language in languages) {
      if (languages.hasOwnProperty(language)) {
        languagesToSet[language] = Number(languages[language]);
      }
    }
    user.experience = languagesToSet;
    user.markModified("experience");
    user.save();
    res.send(200);
  } catch (err) {
    res.sendStatus(400);
  }
});

module.exports = router;
