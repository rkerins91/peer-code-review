import React, { useState, useEffect, useContext } from "react";
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
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  // user context
  const { user, setUser } = useContext(UserContext);

  const checkEmailError = () => {
    if (emailError) {
      return emailError;
    } else return null;
  };

  const checkPasswordError = () => {
    if (passwordError) {
      return passwordError;
    } else return null;
  };

  useEffect(() => {
    if (error.includes("Email")) {
      setEmailError(error);
    } else if (error.includes("Password")) {
      setPasswordError(error);
    } else {
      setEmailError(null);
      setPasswordError(null);
    }
  }, [error]);

  // remove errors when user starts typing
  useEffect(() => {
    if (emailError) {
      setEmailError(null);
    }
  }, [email]);

  useEffect(() => {
    if (passwordError) {
      setPasswordError(null);
    }
  }, [password]);

  const submit = () => {
    async function login(user) {
      try {
        const res = await fetch("/login", {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        });
        const json = await res.json();
        if (json.errors) {
          setError(json.errors[0]);
        } else {
          if ((json.success = true)) {
            localStorage.setItem("peercode-auth-token", json.token);
            setUser(json.user);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }

    const user = {
      email: email,
      password: password
    };
    login(user);
  };

  // if the user is signed in, redirect them to the home page
  if (user) {
    return <Redirect to="/" />;
  } else
    return (
      <SignUpContainer>
        <Typography className={classes.text}> Sign In </Typography>
        <TextField
          className={classes.input}
          label="email address"
          variant="outlined"
          error={checkEmailError() ? true : false}
          helperText={emailError}
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          className={classes.input}
          label="password"
          type="password"
          variant="outlined"
          error={checkPasswordError() ? true : false}
          helperText={passwordError}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
        <p> {JSON.stringify(user)} </p>
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
