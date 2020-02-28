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
  const [selectedThread, setSelectedThread] = useState(null);
  const { threadParam } = useParams();

  // user context
  const { user } = useContext(UserContext);

  const getReviews = async () => {
    try {
      const res = await fetch(`/requests/all/${user._id}`, {
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
          json.threads.forEach(thread => {
            reviews[thread._id] = thread;
          });
          console.log(reviews);
          setReviews(reviews);
          if (!threadParam) {
            setSelectedThread(Object.values(reviews)[0]);
          } else {
            setSelectedThread(reviews[threadParam]);
          }
          return reviews;
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

  const getLocalDate = mongoDate => {
    const localDate = new Date(mongoDate);
    return localDate.toLocaleDateString();
  };

  const isSelected = id => {
    if (threadParam) {
      if (id === threadParam) {
        return classes.selected;
      } else return null;
    } else return null;
  };

  useEffect(() => {
    if (user) {
      setReviews(getReviews());
    }
  }, []);

  return (
    <>
      <Drawer classes={{ paper: classes.drawer }} open variant="permanent">
        <div
          className={classes.fullList}
          role="presentation"
          //   onClick={toggleDrawer(side, false)}
          //   onKeyDown={toggleDrawer(side, false)}
        >
          <List>
            <Typography className={classes.header}>
              {Object.values(reviews).length > 0 ? (
                <span>
                  Reviews
                  <span
                    className={classes.counter}
                    style={{ color: "#43DDC1" }}
                  >
                    {" (" + Object.values(reviews).length + ")"}
                  </span>
                </span>
              ) : (
                "No Reviews To Display"
              )}
            </Typography>
            {Object.values(reviews).map(review => (
              <Link
                className={classes.link}
                to={"/reviews/" + review._id}
                key={review._id}
              >
                <ListItem button onClick={() => setSelectedThread(review)}>
                  <ListItemText
                    className={isSelected(review._id)}
                    primary={review.title}
                    secondary={getLocalDate(review.createdAt)}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <List>
            <Link className={classes.link} to="/code-upload">
              <ListItem button>
                <ListItemText primary={"Upload Code"} />
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>
      <Grid container className={classes.container}>
        <Grid item xs={12} className={classes.gridItem}>
          <ThreadDisplay
            threadData={selectedThread}
            user={user}
            refreshThread={handleThreadRefresh}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ReviewPage;
