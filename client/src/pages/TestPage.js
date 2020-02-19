import React from "react";
import { NavBar, ThreadDisplay } from "components";
import { Grid, makeStyles } from "@material-ui/core";

const useStlyes = makeStyles({
  root: {
    padding: "5%"
  },
  sidebar: {
    height: "100%",
    width: "30%"
  }
});

const TestPage = () => {
  const classes = useStlyes();

  return (
    <div className={classes.root}>
      <NavBar></NavBar>
      <Grid container spacing={0}>
        <Grid item lg={3}>
          This is the sidebar
        </Grid>
        <Grid item lg={9}>
          <ThreadDisplay threadData={null}></ThreadDisplay>
        </Grid>
      </Grid>
    </div>
  );
};

export default TestPage;
