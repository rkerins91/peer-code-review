import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Grid
} from "@material-ui/core";
import { ThreadDisplay } from "components";
import { UserContext } from "context/UserContext";
import SideBar from "./SideBar";
import axios from "axios";

const useStyles = makeStyles({
  header: {
    padding: "2vh",
    fontSize: "4vh",
    fontWeight: 700
  },
  counter: {
    fontSize: "1.5rem"
  },
  drawer: {
    height: "calc(100% - 10vh)",
    top: "10vh",
    zIndex: 1000 // z-index of app bar is 1100, default of drawer is 1200
  },
  list: {
    width: 250
  },
  fullList: {
    width: "20vw"
  },
  selected: {
    color: "#6E3ADB"
  },
  link: {
    textDecoration: "none",
    color: "#6E3ADB"
  },
  container: {
    marginLeft: "20vw",
    marginTop: "10vh",
    width: "80vw",
    height: "90vh"
  },
  gridItem: {
    marginLeft: "5vh",
    marginRight: "5vh",
    height: "80vh"
  }
});

const ReviewPage = () => {
  const classes = useStyles();
  const [reviews, setReviews] = useState({});
  const [requests, setRequests] = useState({});
  const [assigned, setAssigned] = useState({});
  const [selectedThread, setSelectedThread] = useState(null);
  const { threadParam, typeParam } = useParams();

  // user context
  const { user } = useContext(UserContext);

  const getReviews = async () => {
    //helper function to turn response arrays into objects keyed by their id
    const createThreadObj = array => {
      var collection = {};
      array.forEach(thread => {
        console.log(collection);
        collection[thread._id] = thread;
      });
      console.log(collection);
      return collection;
    };

    try {
      const res = await fetch(`/threads/open/${user._id}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const json = await res.json();
      if (json.errors) {
        console.log(json.errors);
        return {}; // if there is an error, return empty user object
      } else {
        if (json.success) {
          setRequests(createThreadObj(json.requests));
          setReviews(createThreadObj(json.reviews));
          setAssigned(createThreadObj(json.assigned));
          if (!threadParam) {
            setSelectedThread(json.requests[0]);
          }
          return json;
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleThreadRefresh = async threadId => {
    for (let key in reviews) {
      if (threadId === key) {
        try {
          const response = await axios({
            method: "get",
            url: `/thread/${threadId}`,
            headers: { "content-type": "application/json" }
          });
          if (response.data.success) {
            reviews[key] = response.data.thread;
            setReviews(reviews);
            setSelectedThread(response.data.thread);
          }
        } catch (err) {
          Location.reload(true); //If there's an error, refresh the whole page
        }
      }
    }
  };

  useEffect(() => {
    if (user) {
      getReviews();
    }
  }, []);

  useEffect(() => {
    switch (typeParam) {
      case "requests":
        setSelectedThread(requests[threadParam]);
        break;
      case "reviews":
        setSelectedThread(reviews[threadParam]);
        break;
      case "assigned":
        setSelectedThread(assigned[threadParam]);
        break;
    }
  }, [reviews, requests, assigned]);

  return (
    <div>
      <SideBar
        requests={Object.values(requests)}
        reviews={Object.values(reviews)}
        assigned={Object.values(assigned)}
        threadParam={threadParam}
        typeParam={typeParam}
        setSelectedThread={setSelectedThread}
      ></SideBar>
      <Grid container className={classes.container}>
        <Grid item xs={12} className={classes.gridItem}>
          <ThreadDisplay
            threadData={selectedThread}
            user={user}
            refreshThread={handleThreadRefresh}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ReviewPage;
