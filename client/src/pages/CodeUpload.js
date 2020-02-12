import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Button,
  TextField,
  Typography,
  makeStyles
} from "@material-ui/core";
import TextEditor from "../components/TextEditor";

const useStlyes = makeStyles({
  root: {}
});

const CodeUpload = () => {
  const classes = useStlyes();

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <TextEditor></TextEditor>
      </Container>
    </div>
  );
};
