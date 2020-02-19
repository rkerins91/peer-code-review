import React, { useState, useEffect } from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { TextEditor } from "components";

const useStyles = makeStyles({
  root: {}
});

const PostDisplay = ({ postData }) => {
  const classes = useStyles();
  const [readPost, setReadPost] = useState(true);
  const [submitState, setSubmitState] = useState(false);
  const [editorHasContent, setEditorHasContent] = useState(false);

  const handleSaveEdit = () => {
    return;
  };

  const handleEditorHasContent = value => {
    setEditorHasContent(value);
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <AccountCircle />
          <Typography>Author Name</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextEditor>
            selectedLanguage="javascript" onSubmit={handleSaveEdit}
            didSubmit={submitState}
            hasContent={handleEditorHasContent}
            readOnly={readPost}
            existingContent={postData.data}
          </TextEditor>
        </Grid>
      </Grid>
    </div>
  );
};

export default PostDisplay;
