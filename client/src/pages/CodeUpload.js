import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
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
import { UserContext } from "context/UserContext";
import { TextEditor } from "components/index";
import ErrorMessage from "components/ErrorMessage";
import SubmitButton from "components/TextEditor/components/SubmitButton";

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
  },
  submit: {
    justifyContent: "center",
    display: "flex"
  },
  errorDisplay: {
    margin: "auto",
    padding: "0"
  }
});

const CodeUpload = () => {
  const user = useContext(UserContext);

  const classes = useStlyes();
  const [requestTitle, setRequestTitle] = useState("");
  const [requestLanguage, setRequestLanguage] = useState("");
  const [editorHasContent, setEditorHasContent] = useState(false);
  const [submitState, setSubmitState] = useState(false);
  const [pageErrors, setPageErrors] = useState(new Set());

  const handleTitleChange = event => {
    setRequestTitle(event.target.value);
  };

  const handleLanguageChange = event => {
    setRequestLanguage(event.target.value);
  };

  //TODO: Map over userContext object to get languages and create a select component with options populated by the context.

  //Handle page errors and update submission state
  const startSubmit = () => {
    let languageError = requestLanguage === "";
    let titleError = requestTitle === "";
    let errorSet = new Set();
    if (languageError || titleError || !editorHasContent) {
      if (languageError) {
        errorSet.add(
          "Please select a language for your request before submitting"
        );
      }
      if (titleError) {
        errorSet.add("Please add a title for your request before submitting");
      }
      if (!editorHasContent) {
        errorSet.add("Please add some content to your review request");
      }
      setPageErrors(errorSet);
    } else {
      //No errors, begin submitting
      setPageErrors(new Set());
      setSubmitState(true);
    }
  };

  //check if user has typed into editor
  const handleHasContent = value => {
    setEditorHasContent(value);
  };

  //get data from editor component
  const handleSubmit = async data => {
    //Wrap up editor data with user and language data and send to server.
    const requestData = {
      title: requestTitle,
      language: requestLanguage,
      content: data,
      user: user
    };

    try {
      const response = await axios({
        method: "post",
        url: "/create-request",
        data: {
          dataObj: JSON.stringify(requestData)
        }
      });
      const success = response.success;
      if (success) {
        //redirect user to their reviews page
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.root}>
      <Grid className={classes.wrapper} container justify="center" spacing={2}>
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
          <TextEditor
            selectedLanguage={requestLanguage}
            onSubmit={handleSubmit}
            didSubmit={submitState}
            hasContent={handleHasContent}
          ></TextEditor>
        </Grid>
        <Grid item xs={12} className={classes.submit}>
          <SubmitButton onChange={startSubmit} />
        </Grid>
        <Grid item xs={12} className={classes.errorDisplay}>
          {[...pageErrors].map((msg, index) => {
            return <ErrorMessage message={msg} key={index}></ErrorMessage>;
          })}
        </Grid>
      </Grid>
    </div>
  );
};

export default CodeUpload;
