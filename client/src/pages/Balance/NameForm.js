import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  makeStyles,
  Paper,
  TextField
} from "@material-ui/core";

const useStyles = makeStyles({
  input: {
    textAlign: "center",
    width: "60%",
    margin: "2vh"
  }
});

const CardForm = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  firstNameError,
  lastNameError
}) => {
  const classes = useStyles();

  const handleFirstNameChange = evt => {
    setFirstName(evt.target.value);
  };
  const handleLastNameChange = evt => {
    setLastName(evt.target.value);
  };

  return (
    <Grid item container xs={12} direction="column" alignItems="center">
      <TextField
        className={classes.input}
        label="First Name"
        type="firstName"
        variant="outlined"
        error={firstNameError ? true : false}
        helperText={firstNameError}
        onChange={handleFirstNameChange}
      />
      <TextField
        className={classes.input}
        label="Last Name"
        type="lastName"
        variant="outlined"
        error={lastNameError ? true : false}
        helperText={lastNameError}
        onChange={handleLastNameChange}
      />
    </Grid>
  );
};

export default CardForm;
