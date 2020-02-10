import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextField, Typography, makeStyles } from "@material-ui/core";
import SignUpContainer from "../components";

const useStyles = makeStyles({
  input: {
    textAlign: "center",
    width: "60%",
    margin: "2vh"
  },
  text: {
    fontSize: "3vw",
    fontWeight: "800"
  },
  button: {
    backgroundColor: "#43DDC1"
  },
  link: {
    marginTop: "2vh"
  }
});

const Signup = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  const validateEmail = () => {
    if (email === "") {
      return false;
    } else return !/\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = () => {
    if (password.length > 6 || password.length === 0) {
      return false;
    } else return true;
  };

  const validateSecondPassword = () => {
    if (secondPassword === password || secondPassword === "") {
      return false;
    } else return true;
  };

  const submit = () => {
    return; // placeholder
  };

  return (
    <SignUpContainer>
      <Typography className={classes.text}> Create An Account </Typography>
      <br />
      <TextField
        className={classes.input}
        error={validateEmail()}
        label="email address"
        variant="outlined"
        onChange={e => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <TextField
        className={classes.input}
        error={validatePassword()}
        label="password"
        type="password"
        variant="outlined"
        helperText={
          password.length > 0 && password.length < 6
            ? "password must be at least 6 characters"
            : ""
        }
        onChange={e => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <TextField
        className={classes.input}
        error={validateSecondPassword()}
        label="re-enter password"
        type="password"
        variant="outlined"
        helperText={
          secondPassword.length > 0 && password !== secondPassword
            ? "passwords must match"
            : ""
        }
        onChange={e => {
          setSecondPassword(e.target.value);
        }}
      />
      <br />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={submit}
      >
        Sign Up
      </Button>
      <Typography className={classes.link}>
        Already have an account? <Link to="/login">login</Link>
      </Typography>
    </SignUpContainer>
  );
};

export default Signup;
