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
  const languages = { ...req.body };
  const user = await User.findById(req.params.id);
  const availableLanguages = [
    "C",
    "C++",
    "Java",
    "JavaScript",
    "Python",
    "Ruby"
  ];
  if (Object.keys(languages).every(ele => availableLanguages.includes(ele))) {
    // Set make values of languages obj numbers
    for (let language in languages) {
      if (languages.hasOwnProperty(language)) {
        languages[language] = Number(languages[language]);
      }
    }

    try {
      // Set user experience to new languages obj and save
      user.experience = languages;
      user.markModified("experience");
      user.save();
      return res.sendStatus(200);
    } catch (err) {
      return res.sendStatus(500);
    }
  }
  res.status(400).send("Invalid language sent");
});

module.exports = router;
