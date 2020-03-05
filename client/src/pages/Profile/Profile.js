import React, { useState, useEffect, useContext } from "react";
import { ProfileName, ProfileExperience, ProfileActivity } from "./index";
import { UserContext } from "context/UserContext";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useParams } from "react-router-dom";
import { Grid, Paper, makeStyles } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";
import { authHeader } from "functions/jwt";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    paddingTop: "15vh",
    paddingLeft: "25vh",
    paddingRight: "25vh",
    overflowX: "auto"
  },
  smallRoot: {
    paddingTop: "10vh"
  },
  paper: {
    textAlign: "center",
    padding: "3vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  largePaper: {
    height: "70vh"
  },
  smallPaper: {
    height: "90vh"
  },
  name: {
    fontWeight: "800"
  }
});

const Profile = ({ editable, userProp, width }) => {
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const { userId } = useParams();
  const { user, setUser } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState({});
  const [experience, setExperience] = useState(user.experience);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  useDeepCompareEffect(() => {
    const getUser = async () => {
      if (!userProfile) {
        const { data } = await axios.get(`/user/profile/${userId}`, authHeader);
        setUser(data.user);
      } else {
        setUser(userProp);
      }
    };
    getUser();
  }, [user]);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const submitEdits = async () => {
    const { data } = await axios.put(
      `/user/edit/${user._id}`,
      {
        name,
        email,
        experience
      },
      authHeader
    );
    console.log(data);
    toggleEditing();
    setUser({ ...user, name, email });
  };

  const changeName = e => setName(e.target.value);

  const changeEmail = e => setEmail(e.target.value);

  const isEditableProfileName = () => {
    if (editable) {
      return (
        <Grid container item>
          <Grid item xs={1} />
          <Grid item xs={10}>
            <ProfileName
              name={user.name}
              email={user.email}
              changeName={changeName}
              changeEmail={changeEmail}
              isEditing={isEditing}
            />
          </Grid>
          <Grid item xs={1}>
            {!isEditing && <EditIcon onClick={toggleEditing} />}
            {isEditing && <SaveRoundedIcon onClick={submitEdits} />}
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container item>
          <Grid item xs={12}>
            <ProfileName name={user.name} email={user.email} />
          </Grid>
        </Grid>
      );
    }
  };

  return (
    Object.keys(user).length > 0 && (
      <Grid
        container
        className={`${width > 960 ? classes.root : classes.smallRoot}`}
      >
        <Grid item xs={12}>
          <Paper
            className={`${classes.paper} ${
              width > 600 ? classes.paper : classes.smallPaper
            }`}
          >
            <Grid container direction="column" spacing={6}>
              {isEditableProfileName()}
              <Grid item>
                <ProfileExperience
                  experience={user.experience}
                  editable={editable}
                  isEditing={isEditing}
                />
              </Grid>
              <Grid item>
                <ProfileActivity />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    )
  );
};

export default Profile;
