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
import AlertSnackbar from "components/AlertSnackbar";
import SubmitButton from "components/TextEditor/components/SubmitButton";
import { languageGrammar } from "utils";

const useStlyes = makeStyles({
  root: {
    padding: "5%"
  },
  wrapper: {
    background: "white",
    borderRadius: "6px",
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
  //const { user } = useContext(UserContext);
  const testUser = {
    _id: "userID",
    experience: { C: 1, "C++": 4, Python: 3, Ruby: 1 }
  };

  const classes = useStlyes();
  const [requestTitle, setRequestTitle] = useState("");
  const [requestLanguage, setRequestLanguage] = useState("");
  const [editorHasContent, setEditorHasContent] = useState(false);
  const [submitState, setSubmitState] = useState(false);
  const [pageAlerts, setPageAlerts] = useState(new Set());
  const [alertState, setAlertState] = useState(false);

  const handleTitleChange = event => {
    setRequestTitle(event.target.value);
  };

  const handleLanguageChange = event => {
    setRequestLanguage(event.target.value);
  };

  //TODO: Map over userContext object to get languages and create a select component with options populated by the context.
  const getLanguages = Object.keys(testUser.experience);

  //Handle page errors and update submission state
  const startSubmit = () => {
    let languageError = requestLanguage === "";
    let titleError = requestTitle === "";
    let errorSet = new Set();
    if (languageError || titleError || !editorHasContent) {
      if (languageError) {
        errorSet.add("Please select a language for your request");
      }
      if (titleError) {
        errorSet.add("Please add a title to your request");
      }
      if (!editorHasContent) {
        errorSet.add("Please add some content to your request");
      }
      setPageAlerts(errorSet);
      setAlertState(true);
    } else {
      //No errors, begin submitting
      setPageAlerts(new Set());
      setSubmitState(true);
    }
  };

  //reset alerts
  const resetAlerts = () => {
    setAlertState(false);
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
      user: testUser
    };

    try {
      const response = await axios({
        method: "post",
        url: `/${testUser._id}/create-request`,
        data: {
          dataObj: JSON.stringify(requestData)
        }
      });
      const success = response.success;
      if (success) {
        //redirect user to their reviews page
        //success snackbar?
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
            {getLanguages.map(language => {
              return (
                <MenuItem value={languageGrammar[language]} key={language}>
                  {language}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextEditor
            selectedLanguage={requestLanguage}
            onSubmit={handleSubmit}
            didSubmit={submitState}
            hasContent={handleHasContent}
            readOnly={false}
          ></TextEditor>
        </Grid>
        <Grid item xs={12} className={classes.submit}>
          <SubmitButton onChange={startSubmit} />
        </Grid>
        <Grid item xs={12} className={classes.errorDisplay}>
          <AlertSnackbar
            openAlert={alertState}
            messages={[...pageAlerts]}
            alertsClosed={resetAlerts}
            variant="error"
            autoHideDuration="6000"
          ></AlertSnackbar>
        </Grid>
      </Grid>
    </div>
  );
};

export default CodeUpload;
