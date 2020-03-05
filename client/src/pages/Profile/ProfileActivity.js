import React from "react";
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

const ProfileActivity = ({ ownProfile }) => {
  const classes = useStyles();
  const ownProfileDisplay = () => {
    if (ownProfile) {
      return (
        <div>
          <Typography variant="h4"> Activity </Typography>
          <Grid container justify="space-around">
            <Grid item>
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
            <Grid item>
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
        </div>
      );
    } else {
      return (
        <div>
          <Typography variant="h4"> Activity </Typography>
          <Grid container justify="space-around">
            <Grid item>
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
            <Grid item>
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
        </div>
      );
    }
  };

  return ownProfileDisplay();
};

export default ProfileActivity;
