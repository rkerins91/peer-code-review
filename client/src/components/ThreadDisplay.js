import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Typography,
  Backdrop,
  CircularProgress,
  makeStyles
} from "@material-ui/core";

import { TextEditor } from "components/index";

const useStlyes = makeStyles({
  root: {
    padding: "5%"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
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

  if (threadData) {
    <div className={classes.root}>
    <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="secondary"></CircularProgress>
        </Backdrop>
    </div>;
  };
  }
  return <div className={classes.root}>

  </div>;
};
