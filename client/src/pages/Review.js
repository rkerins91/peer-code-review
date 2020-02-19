import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography
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
  }
});

const ReviewPage = () => {
  const classes = useStyles();
  const [reviews, setReviews] = useState([]);

  const getReviews = () => {
    return [
      { title: "My Review" },
      { title: "Test" },
      { title: "Javascript function" }
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
              {" "}
              {"Reviews (" + reviews.length + ")"}{" "}
            </Typography>
            {reviews.map(review => (
              <ListItem button key={review.title}>
                <ListItemText primary={review.title} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem button>
              <ListItemText primary={"Upload Code"} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default ReviewPage;
