import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  makeStyles
} from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
import { authHeader } from "functions/jwt";
import coding from "assets/images/coding.jpeg";
import codeRequest from "assets/images/codeRequest.jpeg";

const useStyles = makeStyles({
  paper: {
    minHeight: "75vh",
    textAlign: "center",
    padding: "3vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  name: {
    fontWeight: "800"
  },
  link: {
    textDecoration: "none"
  },
  media: {
    height: "400px",
    width: "400px"
  }
});

const ProfileActivity = ({ ownProfile, userId }) => {
  const [numRequests, setNumRequests] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const getActivity = async () => {
      if (!ownProfile) {
        const { data } = await axios.get(
          `/user/${userId}/activity`,
          authHeader()
        );
        setRating(data.rating);
        setNumRequests(data.requests);
        setNumReviews(data.reviews);
      }
    };
    getActivity();
  });

  const classes = useStyles();
  const ownProfileDisplay = () => {
    if (ownProfile) {
      return (
        <Grid container direction="column" justify="center">
          <Typography variant="h4">Activity</Typography>
          <Grid container justify="space-around">
            <Grid item xs={12} md={6}>
              <Link to="/dashboard/reviews" className={classes.link}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Reviews
                      </Typography>
                    </CardContent>
                    <CardMedia
                      className={classes.media}
                      image={coding}
                      title="Reviews"
                    />
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
            <Grid item xs={12} md={6}>
              <Link to="/dashboard/requests" className={classes.link}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Requests
                      </Typography>
                    </CardContent>
                    <CardMedia
                      className={classes.media}
                      image={codeRequest}
                      title="Reviews"
                    />
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid>
          <Typography variant="h4"> Activity </Typography>
          <Grid container justify="space-around">
            <Grid item xs={12} md={4}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Rating
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                      {rating}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Reviews
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                      {numReviews}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Requests
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                      {numRequests}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      );
    }
  };

  return ownProfileDisplay();
};

export default ProfileActivity;
