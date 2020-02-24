import React from "react";
import { Grid } from "@material-ui/core";
import ReactStripe from "./ReactStripe";

const CardSection = ({ credits, setAddCredit }) => {
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
