const express = require("express");
const { check, body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");

const { User } = require("../database");

router.post(
  "/signup",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please use a valid email address").isEmail(),
    check("password", "Choose a password at least 6 characters long").isLength({
      min: 6
    }),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (errors.length > 0) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //Check for an existing user
      var user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).json({
          errors: [
            {
              value: email,
              msg: "An account with this email address already exists",
              param: "email"
            }
          ]
        });
      } else {
        const newUser = new User({ name, email, password });

        user = await newUser.save();

        //On successful save, create payload and send response token with user
        user.login(user, (err, token) => {
          if (err) throw err;
          res.status(201).json({
            success: true,
            token: "Bearer " + token,
            user: user
          });
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
),
  router.post(
    "/login",
    [
      check("email", "Enter your account email address to login")
        .not()
        .isEmpty(),
      check("password", "Please enter a password to login")
        .not()
        .isEmpty()
    ],
    async (req, res) => {
      const errors = validationResult(req);

      if (errors.length > 0) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Find if user exists
      try {
        var user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({
            errors: [
              {
                value: email,
                msg: "Cannot find a user with this email",
                param: "email"
              }
            ]
          });
        } else {
          // User exists, compare hashed password
          let isMatch = await bcrypt.compare(password, user.password);

          if (isMatch) {
            // Passwords match, create JWT Payload, and send it in response with user object
            user.login(user, (err, token) => {
              if (err) throw err;
              res.status(201).json({
                success: true,
                token: "Bearer " + token,
                user: user
              });
            });
          } else {
            return res.status(400).json({
              errors: [
                {
                  msg: "The password you entered did not match our records",
                  param: "password"
                }
              ]
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  );

router.put("/:id/experience", async (req, res) => {
  const languages = { ...req.body };
  const user = await User.findById(req.params.id);
  if (
    Object.keys(languages).every(ele =>
      process.env.availableLanguages.includes(ele)
    )
  ) {
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
      return res
        .status(200)
        .send({ message: "Successfully updated experience!" });
    } catch (err) {
      return res.sendStatus(500);
    }
  }
  res.status(400).send("Invalid language sent");
});

module.exports = router;
