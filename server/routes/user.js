const express = require("express");
const { check, body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      var user = await User.findOne({ email: email })
      if (user) {
        return res.status(400).json({ errors: ["Email already exists"] });
      } 
      else {
        const newUser = new User({
          name: name,
          email: email,
          password: password,
          experience: {}
        });
        user = await User.create(newUser)
      //On successful save, create payload and send response token with user
        const payload = {
          id: user._id
      };
        jwt.sign(
          payload,
          process.env.SECRET,
          {
            expiresIn: Number(process.env.TOKEN_EXPIRATION)
          },
          (err, token) => {
            res.status(201).json({
              success: true,
              token: "Bearer " + token,
              user: user
            });
          }
        );
      }
    }
    catch (err) {
      console.log(err);
    }
  },

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
  (req, res) => {
    const errors = validationResult(req);
    if (errors.length > 0) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find if user exists
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return res.status(404).json({ errors: ["Email not found"] });
        }
        // User exists, compare hashed password
        bcrypt
          .compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              // Create JWT Payload
              const payload = {
                email: user.email,
                name: user.name
              };
              jwt.sign(
                payload,
                process.env.SECRET,
                {
                  expiresIn: 2628000 //1 month
                },
                (err, token) => {
                  res.status(200).json({
                    success: true,
                    token: "Bearer " + token,
                    user: user
                  });
                }
              );
            } else {
              return res.status(400).json({ errors: ["Password incorrect"] });
            }
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
