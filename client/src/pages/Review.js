import React, { useState, useEffect } from "react";
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
import { NavBar } from "../components";

const useStyles = makeStyles({
  header: {
    padding: "2vh",
    fontSize: "4vh",
    fontWeight: "700"
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
  container: {
    marginLeft: "20vw",
    marginTop: "10vh",
    width: "80vw",
    height: "90vh"
  },
  gridItem: {
    margin: "5vh",
    height: "80vh"
  }
});

const ReviewPage = () => {
  const classes = useStyles();
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState({});

  const getReviews = () => {
    // dummy for now
    setSelectedReview({ title: "App for tall people" });
    return [
      { title: "App for tall people", date: "2020-02-18" },
      { title: "Test Python", date: "2020-02-11" },
      { title: "Javascript function", date: "2020-01-24" }
    ];
  };

  useEffect(() => {
    setReviews(getReviews());
  }, []);

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
              {reviews.length > 0
                ? "Reviews (" + reviews.length + ")"
                : "No Reviews To Display"}
            </Typography>
            {reviews.map(review => (
              <ListItem
                button
                title={review.title}
                onClick={e => {
                  setSelectedReview({ title: e.currentTarget.title });
                }}
                key={review.title}
              >
                <ListItemText primary={review.title} secondary={review.date} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <Link to="/code-upload">
              <ListItem button>
                <ListItemText primary={"Upload Code"} />
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>
      <Grid container className={classes.container}>
        <Grid item xs={12} className={classes.gridItem}>
          {/* PUT HERE */}
          <div> {selectedReview.title} </div>
        </Grid>
      </Grid>
    </>
  );
};

export default ReviewPage;
