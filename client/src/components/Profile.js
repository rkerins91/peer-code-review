import React, { useContext } from "react";
import { UserContext } from "context/UserContext";
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  makeStyles
} from "@material-ui/core";
import codeScreen from "../assets/images/code-screen.jpg";

const useStyles = makeStyles({
  root: {
    paddingTop: "25vh",
    paddingLeft: "25vh",
    paddingRight: "25vh"
  },
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
  }
});

const Profile = props => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Paper>
            <div className={classes.paper}>
              <div>
                <Typography variant="h3" color="primary">
                  {props.user.name}
                </Typography>
                <Typography variant="h5"> {props.user.email} </Typography>
              </div>
              <Grid container justify="center">
                {Object.entries(props.user.experience).map(exp => (
                  <Grid item xs={2}>
                    <Typography> {exp[0]} </Typography>
                    <Typography> {exp[1]} </Typography>
                  </Grid>
                ))}
              </Grid>
              <Typography variant="h4"> Projects </Typography>
              <Grid container justify="space-between">
                <Grid item>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={codeScreen}
                        title="Reviews"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Reviews
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
                <Grid item>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Requests
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
