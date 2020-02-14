import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Button,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  makeStyles
} from "@material-ui/core";
import { TextEditor } from "components/index";

const useStlyes = makeStyles({
  root: {
    padding: "5%"
  },
  wrapper: {
    background: "white",
    width: "80%",
    height: "80%",
    margin: "20px auto"
  },
  header: {
    margin: "4vh",
    fontWeight: "800"
  },
  textInput: {
    textAlign: "center",
    width: "100%"
  },
  languageSelect: {
    width: "80%"
  }
});

const CodeUpload = () => {
  const classes = useStlyes();
  const [requestTitle, setRequestTitle] = useState();
  const [requestLanguage, setRequestLanguage] = useState("");

  const handleTitleChange = event => {
    setRequestTitle(event.target.value);
  };

  const handleLanguageChange = event => {
    setRequestLanguage(event.target.value);
  };

  //Get user context
  //const user = useContext(UserContext);
  //TODO: Map over userContext object to get languages and create a select component with options populated by the context.

  return (
    <div className={classes.root}>
      <Grid className={classes.wrapper} container justify="center" spacing={3}>
        <Typography className={classes.header} variant="h2" align="center">
          Request a Code Review
        </Typography>
        <Grid item xs={8}>
          <TextField
            className={classes.textInput}
            align="left"
            label="Title"
            variant="outlined"
            onChange={handleTitleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <InputLabel id="language-select-label">Language</InputLabel>
          <Select
            className={classes.languageSelect}
            labelid="language-select-label"
            id="language-select"
            value={requestLanguage}
            onChange={handleLanguageChange}
          >
            <MenuItem value="javascript">Javascript</MenuItem>
            <MenuItem value="cpp">C++</MenuItem>
            <MenuItem value="python">Python</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextEditor selectedLanguage={requestLanguage}></TextEditor>
        </Grid>
      </Grid>
    </div>
  );
};

export default CodeUpload;
