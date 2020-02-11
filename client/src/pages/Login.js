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
    margin: "2vh"
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

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    return; // placeholder
  };

  return (
    <SignUpContainer>
      <Typography className={classes.text}> Sign In </Typography>
      <TextField
        className={classes.input}
        label="email address"
        variant="outlined"
        onChange={e => {
          setEmail(e.target.value);
        }}
      />
      <TextField
        className={classes.input}
        label="password"
        type="password"
        variant="outlined"
        onChange={e => {
          setPassword(e.target.value);
        }}
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={submit}
      >
        Login
      </Button>
      <Typography className={classes.switch}>
        Don't have an account?
        <Link className={classes.link} to="/signup">
          sign up
        </Link>
      </Typography>
    </SignUpContainer>
  );
};

export default Login;
