import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Typography,
  Backdrop,
  CircularProgress,
  makeStyles
} from "@material-ui/core";

const useStlyes = makeStyles({
  root: {
    padding: "5%"
  },
  backdrop: {
    zIndex: 2,
    color: "#fff",
    width: "70%",
    left: "30%"
  },
  wrapper: {
    background: "white",
    borderRadius: "6px",
    width: "80%",
    height: "80%",
    margin: "10px auto"
  },
  textInput: {
    textAlign: "center",
    width: "100%"
  }
});

const ThreadDisplay = ({ threadData }) => {
  const classes = useStlyes();
  const [posts, setPosts] = useState(threadData.posts);

  if (!threadData) {
    return (
      <div className={classes.root}>
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="secondary"></CircularProgress>
        </Backdrop>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <Grid container xs={12}>
          <Typography className={classes.header} variant="h3" align="center">
            {threadData.title}
          </Typography>
        </Grid>
      </div>
    );
  }
};

export default ThreadDisplay;
