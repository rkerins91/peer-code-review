import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "context/UserContext";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Typography,
  makeStyles
} from "@material-ui/core";
import NotificationsNoneRoundedIcon from "@material-ui/icons/NotificationsNoneRounded";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Logo } from "./Logo";

const useStyles = makeStyles({
  bar: {
    justifyContent: "space-between"
  },
  linkButton: {
    color: "white",
    marginLeft: "2vw"
  },
  codeButton: {
    color: "#43DDC1",
    border: "solid 2px #43DDC1",
    borderRadius: "3vh",
    fontWeight: "800",
    marginLeft: "2vw"
  },
  iconButton: {
    padding: "6px",
    marginLeft: "2vw"
  },
  notificationIcon: {
    color: "white"
  },
  profileButton: {
    color: "white"
  },
  user: {
    marginLeft: "1vw"
  }
});

const NavBar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // user context
  const { user, setUser } = useContext(UserContext);

  const handleMenu = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar>
      <Toolbar className={classes.bar}>
        <Link to="/">
          <Logo />
        </Link>
        <Toolbar className={classes.right}>
          <Button className={classes.linkButton}> Reviews </Button>
          <Button className={classes.linkButton}> Balance </Button>
          <IconButton className={classes.iconButton}>
            <NotificationsNoneRoundedIcon
              className={classes.notificationIcon}
              fontSize="large"
            />
          </IconButton>
          <Button className={classes.codeButton}> Upload Code </Button>
          <div>
            <IconButton
              className={classes.iconButton}
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              fontSize="large"
            ></IconButton>
            <Button className={classes.profileButton} onClick={handleMenu}>
              <AccountCircle />
              <Typography className={classes.user}>
                {user ? user.name : "profile"}
              </Typography>
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
