import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  Backdrop,
  CircularProgress,
  makeStyles
} from "@material-ui/core";
import PostDisplay from "./PostDisplay";
import AlertSnackbar from "components/AlertSnackbar";

const useStyles = makeStyles({
  root: { padding: "5%" },
  backdrop: {
    zIndex: 1000,
    color: "#fff",
    left: "20vw" // same width as the sidebar
  },
  header: {
    background: "white",
    borderRadius: "6px",
    width: "100%",
    padding: "2em 2em"
  },
  postWrapper: {
    background: "white",
    borderRadius: "6px",
    width: "100%",
    marginTop: "2px",
    padding: "0 3em"
  },
  threadTitle: {
    fontWeight: "500"
  },
  threadDate: {
    fontWeight: "500",
    color: "grey"
  }
});

const ThreadDisplay = ({ threadData, user, refreshThread }) => {
  const classes = useStyles();

  const [pageAlerts, setPageAlerts] = useState(new Set());
  const [postSuccess, setPostSuccess] = useState(false);
  const [alertState, setAlertState] = useState(false);

  const handleErrors = error => {
    setPageAlerts(pageAlerts.add(error));
    setAlertState(true);
  };

  //reset alerts
  const resetAlerts = () => {
    setAlertState(false);
    setPostSuccess(false);
  };

  const handlePostEdit = async postData => {
    const requestData = {
      content: postData.data
    };

    try {
      const response = await axios({
        method: "put",
        url: `/thread/${threadData._id}/${postData.postId}/content`,
        headers: { "content-type": "application/json" },
        data: JSON.stringify(requestData)
      });
      //redirect user to their reviews page
      if (response.data.success) {
        var alerts = new Set();
        alerts.add("Post edited successfulyl!");
        setPageAlerts(alerts);
        setPostSuccess(true);
        refreshThread(threadData._id);
      }
    } catch (err) {
      console.log(err);
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
            {threadData.posts.map((post, index) => {
              return (
                <PostDisplay
                  user={user}
                  postData={post}
                  postLanguage={threadData.language.name}
                  key={post._id}
                  onEditPost={handlePostEdit}
                  onErrors={handleErrors}
                  index={index}
                ></PostDisplay>
              );
            })}
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
          openAlert={postSuccess}
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
