import React, { useState, useEffect } from "react";
import CreditCardContainer from "components/SignUpContainer";
import NameForm from "./NameForm";
import CardForm from "./CardForm";
import {
  Grid,
  Typography,
  Button,
  makeStyles,
  Paper,
  TextField
} from "@material-ui/core";
import ReactStripe from "./ReactStripe";

const useStyles = makeStyles({
  text: {
    fontSize: "3vw",
    fontWeight: "800"
  },
  button: {
    backgroundColor: "#43DDC1",
    marginTop: "1vh",
    marginBottom: "1vh",
    width: "75%"
  }
});

const CardSection = ({ credits, setAddCredit }) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item container xs={12} direction="column">
        <ReactStripe setAddCredit={setAddCredit} credits={credits} />
      </Grid>
      <Grid
        item
        container
        xs={8}
        direction="row"
        alignItems="center"
        justify="center"
      />
    </Grid>
  );
};

export default CardSection;
