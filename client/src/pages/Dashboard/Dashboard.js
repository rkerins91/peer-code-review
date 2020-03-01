import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { ThreadDisplay } from "components";
import { UserContext } from "context/UserContext";
import SideBar from "./SideBar";
import axios from "axios";

const useStyles = makeStyles({
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

const Dashboard = () => {
  const classes = useStyles();
  const [reviews, setReviews] = useState({});
  const [requests, setRequests] = useState({});
  const [assigned, setAssigned] = useState({});
  const [selectedThread, setSelectedThread] = useState(null);
  var { threadParam, typeParam } = useParams();
  const [defaultSelection, setDefaultSelection] = useState(null);

  // user context
  const { user } = useContext(UserContext);

  const getReviews = async () => {
    //helper function to turn response arrays into objects keyed by their id
    const createThreadObj = array => {
      var collection = {};
      array.forEach(thread => {
        collection[thread._id] = thread;
      });
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
          return;
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleThreadRefresh = async (threadId, type) => {
    try {
      const response = await axios({
        method: "get",
        url: `/thread/${threadId}`,
        headers: { "content-type": "application/json" }
      });
      if (response.data.success) {
        switch (type) {
          case "requests":
            requests[threadId] = response.data.thread;
            setRequests(requests);
            break;
          case "reviews":
            reviews[threadId] = response.data.thread;
            setReviews(reviews);
            break;
          case "assigned":
            assigned[threadId] = response.data.thread;
            setAssigned(assigned);
            break;
        }
        setSelectedThread(response.data.thread);
      }
    } catch (err) {
      Location.reload(true); //If there's an error, refresh the whole page
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
      default:
        // fallback, select the first thread in the first collection that has a thread as selected by default
        if (Object.values(requests).length > 0) {
          threadParam = Object.values(requests)[0]._id;
          setSelectedThread(requests[threadParam]);
          setDefaultSelection({ type: "requests", threadId: threadParam });
        } else if (Object.values(reviews).length > 0) {
          threadParam = Object.values(reviews)[0]._id;
          setSelectedThread(reviews[threadParam]);
          setDefaultSelection({ type: "reviews", threadId: threadParam });
        } else if (Object.values(assigned).length > 0) {
          threadParam = Object.values(assigned)[0]._id;
          setSelectedThread(assigned[threadParam]);
          setDefaultSelection({ type: "assigned", threadId: threadParam });
        }
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
        defaultSelection={defaultSelection}
      ></SideBar>
      <Grid container className={classes.container}>
        <Grid item xs={12} className={classes.gridItem}>
          <ThreadDisplay
            threadData={selectedThread}
            user={user}
            refreshThread={handleThreadRefresh}
            typeParam={typeParam}
            defaultSelection={defaultSelection}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
