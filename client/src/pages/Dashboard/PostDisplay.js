import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  makeStyles,
  Button,
  Divider
} from "@material-ui/core";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
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
    color: "#888888",
    textTransform: "none",
    marginLeft: "5px"
  },
  link: {
    textDecoration: "none",
    color: "black"
  },
  saveGrid: {
    marginBottom: "2vh"
  },
  saveButton: {
    background: "#43DDC1"
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

  //check for errors before telling text editor to go through data conversion
  const handleSave = () => {
    if (!editorHasContent) {
      onErrors("New content cannot be blank");
      setSubmitState(false);
    } else {
      setSubmitState(true);
      setReadOnly(true);
    }
  };

  const handleToggleEdit = () => {
    setReadOnly(prev => !prev);
  };

  const editIcon = () => {
    if (readOnly) {
      return (
        <EditIcon className={classes.editButton} onClick={handleToggleEdit} />
      );
    } else {
      return (
        <CloseIcon className={classes.editButton} onClick={handleToggleEdit} />
      );
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
      <Grid container spacing={1} justify="space-between" alignItems="center">
        <Grid item xs={11}>
          <Link to={`/profile/${postData.author}`} className={classes.link}>
            <AccountCircle className={classes.posterInfo} />
            <Typography className={classes.posterInfo}>
              {postData.authorName}
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={1}>
          {postData.author === user._id ? editIcon() : <div></div>}
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
        <Grid item className={classes.saveGrid}>
          {readOnly ? (
            <div></div>
          ) : (
            <Button
              className={classes.saveButton}
              variant="contained"
              color="primary"
              onClick={handleSave}
            >
              Save
            </Button>
          )}
        </Grid>
      </Grid>
      <Divider />
    </div>
  );
};

export default PostDisplay;
