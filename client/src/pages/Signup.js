import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, TextField, Typography, makeStyles } from "@material-ui/core";
import { SignUpContainer } from "../components";
import { UserContext } from "../context/UserContext";

const useStyles = makeStyles({
  input: {
    textAlign: "center",
    width: "60%",
    margin: "2vh"
  },
  text: {
    fontSize: "3vw",
    fontWeight: "800",
    marginBottom: "2vh"
  },
  button: {
    backgroundColor: "#43DDC1",
    marginLeft: "30%",
    marginRight: "30%",
    marginTop: "2vh",
    marginBottom: "2vh",
    width: "30%"
  },
  switch: {
    marginTop: "2vh",
    fontWeight: "700"
  },
  link: {
    marginLeft: "1vh",
    textDecoration: "none"
  }
});

const Signup = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  // user context
  const { user, setUser } = useContext(UserContext);

  const validateEmail = () => {
    if (email === "") {
      return false;
    } else return !/\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = () => {
    if (password.length > 5 || password.length === 0) {
      return null;
    } else return "password must be at least 6 characters";
  };

  const validateSecondPassword = () => {
    if (secondPassword === password || secondPassword === "") {
      return null;
    } else return "passwords must match";
  };

  const submit = () => {
    async function signup(user) {
      try {
        let res = await fetch("/signup", {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        });
        let json = await res.json();
        console.log(json);
        if (json.errors) {
          console.log(json.errors[0]);
        } else {
          if ((json.success = true)) {
            localStorage.setItem("peercode-auth-token", json.token);
            setUser(json.user);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }

    let user = {
      email: email,
      name: name,
      password: password,
      confirmPassword: secondPassword
    };

    signup(user);
  };

  // if the user is signed in, redirect them to the home page
  if (user) {
    return <Redirect to="/" />;
  } else
    return (
      <SignUpContainer>
        <Typography className={classes.text}> Create An Account </Typography>
        <TextField
          className={classes.input}
          label="email address"
          variant="outlined"
          error={validateEmail()}
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          className={classes.input}
          label="name"
          variant="outlined"
          onChange={e => {
            setName(e.target.value);
          }}
        />
        <TextField
          className={classes.input}
          label="password"
          type="password"
          variant="outlined"
          error={validatePassword() ? true : false}
          helperText={validatePassword()}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
        <TextField
          className={classes.input}
          label="re-enter password"
          type="password"
          variant="outlined"
          error={validateSecondPassword() ? true : false}
          helperText={validateSecondPassword()}
          onChange={e => {
            setSecondPassword(e.target.value);
          }}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={submit}
        >
          Sign Up
        </Button>
        <Typography className={classes.switch}>
          Already have an account?
          <Link className={classes.link} to="/login">
            login
          </Link>
        </Typography>
      </SignUpContainer>
    );
};

export default Signup;
