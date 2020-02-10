import React from "react";
import { Link } from "react-router-dom";
import { Button, Paper, TextField, Typography, Grid } from "@material-ui/core";

const useStyles = {
  root: {
    padding: "10vh",
    backgroundColor: "#6E3ADB",
    height: "80vh"
  },
  text: {
    fontWeight: "800",
    fontSize: "4vh"
  },
  signUp: {
    width: "50vw",
    padding: "5vh",
    textAlign: "center",
    rounded: true,
    backgroundColor: "white",
    margin: "auto"
  }
};

const SignUpContainer = props => {
  const classes = useStyles;

  return (
    <div style={classes.root}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} s={6}>
          <Paper style={classes.signUp} elevation={3}>
            {props.children}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignUpContainer;
