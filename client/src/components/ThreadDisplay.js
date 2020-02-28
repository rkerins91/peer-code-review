import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  Backdrop,
  CircularProgress,
  makeStyles,
  Button
} from "@material-ui/core";
import PostDisplay from "./PostDisplay";
import AlertSnackbar from "components/AlertSnackbar";
import { TextEditor } from "components";

const useStyles = makeStyles({
  root: { padding: "5%" },
  backdrop: {
    zIndex: 900,
    color: "#fff",
    left: "20vw" // same width as the sidebar
  },
  header: {
    background: "white",
    width: "100%",
    padding: "2em 2em",
    marginBottom: "2px"
  },
  postWrapper: {
    background: "white",
    width: "100%",
    padding: "0 3em"
  },
  editorWrapper: {
    background: "white",
    width: "100%",
    padding: "0 3em"
  },
  threadTitle: {
    fontWeight: "500"
  },
  threadDate: {
    fontWeight: "500",
    color: "grey"
  },
  editButton: {
    backgroundColor: "#43DDC1",
    textTransform: "none",
    margin: "1em auto",
    justifySelf: "center"
  }
});

const ThreadDisplay = ({
  threadData,
  user,
  refreshThread,
  typeParam,
  defaultSelection
}) => {
  const classes = useStyles();

  const [replyButtonText, setReplyButtonText] = useState("Reply");

  //Editor state
  const [readOnly, setReadOnly] = useState(true);
  const [editorHasContent, setEditorHasContent] = useState(false);
  const [submitState, setSubmitState] = useState(false);

  const handleHasContent = value => {
    setEditorHasContent(value);
  };

  //User messaging state
  const [pageAlerts, setPageAlerts] = useState(new Set());
  const [postSuccessAlert, setPostSuccessAlert] = useState(false);
  const [alertState, setAlertState] = useState(false);

  const handleErrors = error => {
    var alerts = new Set();
    alerts.add(error);
    setPageAlerts(alerts);
    setAlertState(true);
  };

  //reset alerts
  const resetAlerts = () => {
    setAlertState(false);
    setPostSuccessAlert(false);
    const alerts = new Set();
    setPageAlerts(alerts);
  };

  const handleToggleReply = () => {
    setReadOnly(!readOnly);
    if (replyButtonText === "Reply") {
      setReplyButtonText("Cancel");
    } else {
      setReplyButtonText("Reply");
    }
  };

  const handleSaveReply = () => {
    if (!editorHasContent) {
      handleErrors("New content cannot be blank");
      setSubmitState(false);
    } else {
      setSubmitState(true);
      setReplyButtonText("Reply");
    }
  };

  const handlePostEdit = async ({ postId, data }) => {
    const requestData = {
      author: user._id,
      authorName: user.name,
      content: data
    };

    if (postId) {
      //Truthy if this is a post edit
      try {
        const response = await axios({
          method: "put",
          url: `/thread/${threadData._id}/post/${postId}`,
          headers: { "content-type": "application/json" },
          data: JSON.stringify(requestData)
        });
        if (response.data.success) {
          var alerts = new Set();
          alerts.add("Post edited successfully!");
          setPageAlerts(alerts);
          setPostSuccessAlert(true);
          if (typeParam) {
            refreshThread(threadData._id, typeParam);
          } else refreshThread(threadData._id, defaultSelection.type);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      //This is a new reply
      try {
        const response = await axios({
          method: "post",
          url: `/thread/${threadData._id}/post`,
          headers: { "content-type": "application/json" },
          data: JSON.stringify(requestData)
        });
        if (response.data.success) {
          var alerts = new Set();
          alerts.add("Reply posted successfully!");
          setPageAlerts(alerts);
          setPostSuccessAlert(true);
          setSubmitState(false);
          setReadOnly(true);
          if (typeParam) {
            refreshThread(threadData._id, typeParam);
          } else refreshThread(threadData._id, defaultSelection.type);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

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
                  user={user}
                  postData={post}
                  postLanguage={threadData.language.name}
                  key={post._id}
                  onEditPost={handlePostEdit}
                  onErrors={handleErrors}
                ></PostDisplay>
              );
            })}
          </Grid>
          <Grid item className={classes.editorWrapper} xs={12}>
            <Button
              className={classes.editButton}
              variant="contained"
              color="primary"
              onClick={handleToggleReply}
            >
              {replyButtonText}
            </Button>
          </Grid>
          <Grid item className={classes.editorWrapper} xs={12}>
            <TextEditor
              selectedLanguage={threadData.language.name}
              onSubmit={handlePostEdit}
              didSubmit={submitState}
              hasContent={handleHasContent}
              readOnly={readOnly}
            ></TextEditor>
          </Grid>
          <Grid item xs={12} className={classes.editorWrapper}>
            {readOnly ? (
              <div></div>
            ) : (
              <Button
                className={classes.editButton}
                variant="contained"
                color="primary"
                onClick={handleSaveReply}
              >
                Post
              </Button>
            )}
          </Grid>
        </Grid>
        <AlertSnackbar
          openAlert={alertState}
          messages={[...pageAlerts]}
          alertsClosed={resetAlerts}
          variant="error"
          autoHideDuration="6000"
        ></AlertSnackbar>
        <AlertSnackbar
          openAlert={postSuccessAlert}
          messages={[...pageAlerts]}
          alertsClosed={resetAlerts}
          variant="success"
          autoHideDuration="6000"
        ></AlertSnackbar>
      </div>
    );
  }
};

export default ThreadDisplay;
