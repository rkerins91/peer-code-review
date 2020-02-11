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
      <br />
      <TextField
        className={classes.input}
        label="email address"
        variant="outlined"
        onChange={e => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <TextField
        className={classes.input}
        label="password"
        type="password"
        variant="outlined"
        helperText={
          password.length > 0 && password.length < 6 ? "error text" : ""
        }
        onChange={e => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={submit}
      >
        Login
      </Button>
      <Typography className={classes.link}>
        Don't have an account? <Link to="/signup">sign up</Link>
      </Typography>
    </SignUpContainer>
  );
};

export default Login;
