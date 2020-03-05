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
  }
});
const ProfileActivity = () => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h4"> Activity </Typography>
      <Grid container justify="space-between">
        <Grid item>
          <Link to="/dashboard/reviews" className={classes.link}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  // image={codeScreen}
                  title="Reviews"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Reviews
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/dashboard/requests" className={classes.link}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  // image="/static/images/cards/contemplative-reptile.jpg"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Requests
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileActivity;
