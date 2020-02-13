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

  const validateEmail = () => {
    if (email === "") {
      return false;
    } else return !/\S+@\S+\.\S+/.test(email);
  };

  const validateName = () => {
    if (email === "") {
      return false;
    } else return true;
  };

  const validatePassword = () => {
    if (password.length > 6 || password.length === 0) {
      return null;
    } else return "password must be at least 6 characters";
  };

  const validateSecondPassword = () => {
    if (secondPassword === password || secondPassword === "") {
      return null;
    } else return "passwords must match";
  };

  const submit = () => {
    return; // placeholder
  };

  return (
    <SignUpContainer>
      <Typography className={classes.text}> Create An Account </Typography>
      <TextField
        className={classes.input}
        error={validateEmail()}
        label="email address"
        variant="outlined"
        onChange={e => {
          setEmail(e.target.value);
        }}
      />
      <TextField
        className={classes.input}
        error={validateName()}
        label="name"
        variant="outlined"
        onChange={e => {
          setName(e.target.value);
        }}
      />
      <TextField
        className={classes.input}
        error={validatePassword() ? true : false}
        label="password"
        type="password"
        variant="outlined"
        helperText={validatePassword()}
        onChange={e => {
          setPassword(e.target.value);
        }}
      />
      <TextField
        className={classes.input}
        error={validateSecondPassword() ? true : false}
        label="re-enter password"
        type="password"
        variant="outlined"
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
