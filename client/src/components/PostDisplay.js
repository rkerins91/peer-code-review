import React, { useState, useEffect } from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { TextEditor } from "components";

const useStyles = makeStyles({
  root: {
    margin: "4vh 0"
  },
  posterInfo: {
    display: "inline",
    fontSize: "1.5em",
    margin: "0 1vh"
  }
});

const PostDisplay = ({ postData, postLanguage }) => {
  const classes = useStyles();
  const [readOnly, setReadOnly] = useState(true);
  const [submitState, setSubmitState] = useState(false);
  const [editorHasContent, setEditorHasContent] = useState(false);

  const handleSaveEdit = () => {
    return;
  };

  const handleHasContent = value => {
    setEditorHasContent(value);
  };

  postData.data.entityMap = {};

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <AccountCircle className={classes.posterInfo} />
          <Typography className={classes.posterInfo}>
            {postData.authorName}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextEditor
            selectedLanguage={postLanguage}
            onSubmit={handleSaveEdit}
            didSubmit={submitState}
            hasContent={handleHasContent}
            readOnly={readOnly}
            existingContent={postData.data}
          ></TextEditor>
        </Grid>
      </Grid>
    </div>
  );
};

export default PostDisplay;
