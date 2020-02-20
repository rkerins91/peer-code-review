import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Backdrop,
  CircularProgress,
  makeStyles
} from "@material-ui/core";
import PostDisplay from "./PostDisplay";

const useStyles = makeStyles({
  root: { padding: "5%" },
  backdrop: {
    zIndex: 1000,
    color: "#fff",
    left: "20vw" // same width as the sidebar
  },
  header: {
    background: "white",
    borderRadius: "6px",
    width: "100%",
    padding: "2em 2em"
  },
  postWrapper: {
    background: "white",
    borderRadius: "6px",
    width: "100%",
    marginTop: "2px",
    padding: "0 3em"
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

  const getLocalDate = mongoDate => {
    const localDate = new Date(mongoDate);
    return localDate.toLocaleDateString();
  };

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
              {threadData.title}
            </Typography>
            <Typography
              className={classes.threadDate}
              variant="subtitle1"
              align="left"
            >
              {getLocalDate(threadData.createdAt)}
            </Typography>
          </Grid>
          <Grid item className={classes.postWrapper} xs={12}>
            {threadData.posts.map(post => {
              return (
                <PostDisplay
                  postData={post}
                  postLanguage={threadData.language.name}
                  key={post._id}
                ></PostDisplay>
              );
            })}
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default ThreadDisplay;
