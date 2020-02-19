import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Backdrop,
  CircularProgress,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles({
  root: { padding: "5%" },
  backdrop: {
    zIndex: 1000,
    color: "#fff",
    left: "25%"
  },
  header: {
    background: "white",
    borderRadius: "6px",
    width: "100%",
    marginTop: "60px",
    padding: "2em 2em"
  },
  postWrapper: {
    background: "white",
    borderRadius: "6px",
    width: "100%",
    height: "2000px",
    marginTop: "2px",
    padding: "2em 2em"
  },
  threadTitle: {
    fontWeight: "500"
  },
  threadDate: {
    fontWeight: "500",
    color: "grey"
  }
});

const ThreadDisplay = ({ threadData }) => {
  const classes = useStyles();
  //const [posts, setPosts] = useState(threadData.posts);

  if (!threadData) {
    return (
      <div>
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="secondary"></CircularProgress>
        </Backdrop>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item className={classes.header} xs={12}>
            <Typography
              className={classes.threadTitle}
              variant="h4"
              align="left"
            >
              Thread Title
            </Typography>
            <Typography
              className={classes.threadDate}
              variant="subtitle1"
              align="left"
            >
              Thread Created at
            </Typography>
          </Grid>
          <Grid item className={classes.postWrapper} xs={12}>
            POST CONTENT GOES HERE
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default ThreadDisplay;
