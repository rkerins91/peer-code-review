import React, { useState } from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  Backdrop,
  CircularProgress,
  makeStyles,
  Button,
  Tooltip
} from "@material-ui/core";
import PostDisplay from "./PostDisplay";
import AlertSnackbar from "components/AlertSnackbar";
import { TextEditor } from "components";
import { authHeader } from "functions/jwt";

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
    fontWeight: "500",
    display: "inline-flex"
  },
  threadDate: {
    fontWeight: "500",
    color: "grey",
    display: "block"
  },
  editButton: {
    backgroundColor: "#43DDC1",
    textTransform: "none",
    margin: "1em 1em",
    justifySelf: "center"
  },
  declineButton: {
    backgroundColor: "#43DDC1",
    textTransform: "none",
    margin: "1em 1em",
    float: "right"
  }
});

const ThreadDisplay = ({
  threadData,
  user,
  refreshThread,
  assignmentActions,
  typeParam
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

  var displayDecline = false;
  if (typeParam) {
    if (typeParam === "assigned") {
      displayDecline = true;
    }
  }

  const handleDecline = async () => {
    var alerts = new Set();
    try {
      const response = await axios({
        method: "patch",
        url: `/user/${user._id}/decline-request/${threadData._id}`,
        headers: { "content-type": "application/json" }
      });
      if (response.data.success) {
        alerts.add("Request declined successfully");
        setPageAlerts(alerts);
        setPostSuccessAlert(true);
        assignmentActions(threadData._id, true);
      } else throw new Error("Request unsuccessful");
    } catch (err) {
      alerts.add("Could not decline request");
      setPageAlerts(alerts);
      setAlertState(true);
      setSubmitState(false);
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
        var alerts = new Set();
        const response = await axios({
          method: "put",
          url: `/thread/${threadData._id}/post/${postId}`,
          headers: {
            "content-type": "application/json",
            ...authHeader().headers
          },
          data: JSON.stringify(requestData)
        });
        if (response.data.success) {
          alerts.add("Post edited successfully!");
          setPageAlerts(alerts);
          setPostSuccessAlert(true);
          if (typeParam) {
            refreshThread(threadData._id, typeParam);
          } else throw new Error("Request unsuccessful");
        }
      } catch (err) {
        alerts.add("Post Edit failed");
        setPageAlerts(alerts);
        setAlertState(true);
        setSubmitState(false);
      }
    } else {
      //This is a new reply
      try {
        var alerts = new Set();
        const response = await axios({
          method: "post",
          url: `/thread/${threadData._id}/post`,
          headers: {
            "content-type": "application/json",
            ...authHeader().headers
          },
          data: JSON.stringify(requestData)
        });
        if (response.data.success) {
          alerts.add("Reply posted successfully!");
          setPageAlerts(alerts);
          setPostSuccessAlert(true);
          setSubmitState(false);
          setReadOnly(true);
          if (typeParam) {
            if (typeParam === "assigned") {
              assignmentActions(threadData._id, false);
            } else refreshThread(threadData._id, typeParam);
          }
        } else throw new Error("Request unsuccessful");
      } catch (err) {
        alerts.add("Reply post failed");
        setPageAlerts(alerts);
        setAlertState(true);
        setSubmitState(false);
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
            {displayDecline ? (
              <Tooltip title="Decline to review this request?">
                <Button
                  className={classes.declineButton}
                  variant="contained"
                  color="primary"
                  onClick={handleDecline}
                >
                  Decline
                </Button>
              </Tooltip>
            ) : (
              <span />
            )}
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
