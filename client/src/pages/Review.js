import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
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
import { NavBar, ThreadDisplay } from "components";
import { UserContext } from "context/UserContext";
import axios from "axios";

const useStyles = makeStyles({
  header: {
    padding: "2vh",
    fontSize: "4vh",
    fontWeight: 700
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
  uploadLink: {
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
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  // user context
  const { user } = useContext(UserContext);

  const getReviews = () => {
    async function getRequests() {
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
          if ((json.success = true)) {
            setReviews(json.threads);
            if (json.threads[0]) {
              setSelectedReview(json.threads[0]);
            }
            return;
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
    getRequests();
  };

  const handleThreadRefresh = async threadId => {
    var tempReviews = reviews;
    for (let i = 0; i < reviews.length; i++) {
      if (threadId === tempReviews[i]._id) {
        try {
          const response = await axios({
            method: "get",
            url: `/thread/${threadId}`,
            headers: { "content-type": "application/json" }
          });
          if (response.data.success) {
            tempReviews[i] = response.data.thread;
            setReviews(tempReviews);
            setSelectedReview(reviews[i]);
            return;
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
    if (selectedReview) {
      if (id === selectedReview._id) {
        return classes.selected;
      } else return null;
    } else return null;
  };

  useEffect(() => {
    if (!user) {
      return;
    } else getReviews();
  }, [user]);

  return (
    <>
      <NavBar />
      <Drawer classes={{ paper: classes.drawer }} open variant="permanent">
        <div
          className={classes.fullList}
          role="presentation"
          //   onClick={toggleDrawer(side, false)}
          //   onKeyDown={toggleDrawer(side, false)}
        >
          <List>
            <Typography className={classes.header}>
              {reviews.length > 0 ? (
                <span>
                  Reviews
                  <span style={{ color: "#43DDC1" }}>
                    {" (" + reviews.length + ")"}
                  </span>
                </span>
              ) : (
                "No Reviews To Display"
              )}
            </Typography>
            {reviews.map(review => (
              <ListItem
                button
                onClick={() => setSelectedReview(review)}
                key={review._id}
              >
                <ListItemText
                  className={isSelected(review._id)}
                  primary={review.title}
                  secondary={getLocalDate(review.createdAt)}
                />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <Link className={classes.uploadLink} to="/code-upload">
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
            threadData={selectedReview}
            user={user}
            refreshThread={handleThreadRefresh}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ReviewPage;
