import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  makeStyles,
  Button,
  Divider
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { TextEditor } from "components";

const useStyles = makeStyles({
  root: {
    margin: "4vh 0"
  },
  posterInfo: {
    display: "inline",
    fontSize: "1.5em",
    margin: "0 1vh 0 0"
  },
  editor: {
    padding: "10px",
    paddingLeft: "5em"
  },
  editButton: {
    backgroundColor: "#43DDC1",
    textTransform: "none",
    marginLeft: "5px"
  }
});

const PostDisplay = ({
  postData,
  postLanguage,
  onEditPost,
  onErrors,
  user
}) => {
  const classes = useStyles();

  //editor state
  const [readOnly, setReadOnly] = useState(true);
  const [submitState, setSubmitState] = useState(false);
  const [editorHasContent, setEditorHasContent] = useState(false);
  const [editButtonText, setEditButtonText] = useState("Edit");

  //check for errors before telling text editor to go through data conversion
  const handleSave = () => {
    if (!editorHasContent) {
      onErrors("New content cannot be blank");
      setSubmitState(false);
    } else {
      setSubmitState(true);
      setReadOnly(true);
      setEditButtonText("Edit");
    }
  };

  const handleToggleEdit = () => {
    setReadOnly(!readOnly);
    if (editButtonText === "Edit") {
      setEditButtonText("Cancel");
    } else {
      setEditButtonText("Edit");
    }
  };

  const handleHasContent = value => {
    setEditorHasContent(value);
  };

  if (postData) {
    postData.data.entityMap = {};
  }

  //Runs only on successful submit, reset submit state.
  useEffect(() => {
    setSubmitState(false);
  }, [submitState]);

  if (!user) {
    return <p>Nothing to display</p>;
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={1} justify="flex-start" alignItems="center">
        <Grid item xs={12}>
          <AccountCircle className={classes.posterInfo} />
          <Typography className={classes.posterInfo}>
            {postData.authorName}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          {postData.author === user._id ? (
            <Button
              className={classes.editButton}
              variant="contained"
              color="primary"
              onClick={handleToggleEdit}
            >
              {editButtonText}
            </Button>
          ) : (
            <div></div>
          )}
          {readOnly ? (
            <div></div>
          ) : (
            <Button
              className={classes.editButton}
              variant="contained"
              color="primary"
              onClick={handleSave}
            >
              Save
            </Button>
          )}
        </Grid>
        <Grid item className={classes.editor} xs={12}>
          <TextEditor
            selectedLanguage={postLanguage}
            onSubmit={onEditPost}
            didSubmit={submitState}
            hasContent={handleHasContent}
            readOnly={readOnly}
            existingContent={postData.data}
            postId={postData._id}
          ></TextEditor>
        </Grid>
      </Grid>
      <Divider />
    </div>
  );
};

export default PostDisplay;
