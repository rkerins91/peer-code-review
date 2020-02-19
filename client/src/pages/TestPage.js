import React from "react";
import { NavBar, ThreadDisplay } from "components";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {},
  sidebar: {
    background: "white",
    height: "1000px",
    width: "30%",
    padding: "60px"
  }
});

const TestPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavBar></NavBar>
      <Grid container spacing={0}>
        <Grid className={classes.sidebar} item xs={3} lg={3}>
          This is the sidebar
        </Grid>
        <Grid item xs={9} lg="auto">
          <ThreadDisplay threadData={null}></ThreadDisplay>
        </Grid>
      </Grid>
    </div>
  );
};

export default TestPage;
