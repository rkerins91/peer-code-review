import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import ThreadDisplay from "./ThreadDisplay";
import { UserContext } from "context/UserContext";
import SideBar from "./SideBar";
import axios from "axios";
import { authHeader } from "../../functions/jwt";

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
  const routeHistory = useHistory();

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
      const { data } = await axios({
        url: `/threads/open/${user._id}`,
        method: "get",
        headers: {
          "Content-Type": "application/json",
          ...authHeader.headers
        }
      });
      if (data.errors) {
        console.log(data.errors);
        return {}; // if there is an error, return empty user object
      } else {
        if (data.success) {
          setRequests(createThreadObj(data.requests));
          setReviews(createThreadObj(data.reviews));
          setAssigned(createThreadObj(data.assigned));
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
        headers: { "content-type": "application/json", ...authHeader.headers }
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

  const handleAssignmentActions = async (threadId, decline) => {
    delete assigned[threadId];
    setAssigned(assigned);
    if (!decline) {
      handleThreadRefresh(threadId, "reviews"); // Refresh the thread and treat as a review instead of assigned.
      routeHistory.push("/dashboard/reviews/" + threadId);
    } else {
      typeParam = null;
      selectDefault();
    }
  };

  useEffect(() => {
    if (user) {
      getReviews();
    }
  }, []);

  const selectDefault = () => {
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
          routeHistory.replace("/dashboard/requests/" + threadParam);
        } else if (Object.values(reviews).length > 0) {
          threadParam = Object.values(reviews)[0]._id;
          setSelectedThread(reviews[threadParam]);
          routeHistory.replace("/dashboard/reviews/" + threadParam);
        } else if (Object.values(assigned).length > 0) {
          threadParam = Object.values(assigned)[0]._id;
          setSelectedThread(assigned[threadParam]);
          routeHistory.replace("/dashboard/assigned/" + threadParam);
        }
    }
  };

  useEffect(() => {
    selectDefault();
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
            assignmentActions={handleAssignmentActions}
            typeParam={typeParam}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
