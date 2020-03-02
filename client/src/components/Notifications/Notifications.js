import React, { useState, useEffect, useContext } from "react";
import { Menu, MenuItem, makeStyles, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { UserContext } from "context/UserContext";
import axios from "axios";
import NotificationsNoneRoundedIcon from "@material-ui/icons/NotificationsNoneRounded";
import NotificationsActiveRoundedIcon from "@material-ui/icons/NotificationsActiveRounded";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles({
  notificationIcon: {
    color: "white"
  },
  menu: {
    backgroundColor: blue
  },
  link: {
    textDecoration: "none",
    color: "#6E3ADB",
    fontSize: "24px"
  },
  seen: {
    background: "#CCBAF2",
    color: "white"
  },
  unseen: {
    background: "#6E3ADB",
    color: "white"
  },
  focused: {
    color: "#6E3ADB"
  }
});
const Notifications = () => {
  const classes = useStyles();
  const [seen, setSeen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const open = Boolean(anchorEl);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const getNotifications = async () => {
      const { data } = await axios.get(`/notifications/${user._id}`);
      setNotifications(data.reverse());
    };
    getNotifications();
  }, []);

  useEffect(() => {
    setSeen(notifications.every(ele => ele.seen === true));
  });

  const handleMenu = e => {
    setAnchorEl(e.currentTarget);
    setSeen(true);
  };

  const handleClose = () => {
    const setUnread = notifications.map(ele => {
      ele.seen = true;
      return ele;
    });
    setNotifications(setUnread);
    setAnchorEl(null);
    axios.put(`/notifications/update-read`, { notifications });
  };
  console.log(notifications);
  return (
    <div>
      <IconButton
        onClick={handleMenu}
        disabled={notifications.length < 1}
        disableTouchRipple
      >
        {seen ? (
          <NotificationsNoneRoundedIcon
            fontSize="large"
            className={classes.notificationIcon}
          />
        ) : (
          <div>
            <NotificationsActiveRoundedIcon
              fontSize="large"
              className={classes.notificationIcon}
            />
          </div>
        )}
      </IconButton>
      <Menu
        id="notification-bell"
        className={classes.menu}
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: "center"
        }}
        keepMounted
        transformOrigin={{
          vertical: -40,
          horizontal: "right"
        }}
        open={open}
        onClose={handleClose}
      >
        {notifications.map(ele => {
          return (
            <Link to={ele.link} className={classes.link} key={ele._id}>
              <MenuItem
                className={`${classes.link} ${
                  ele.seen ? classes.seen : classes.unseen
                }`}
                focusVisible={classes.focused}
              >
                {ele.message}
              </MenuItem>
            </Link>
          );
        })}
      </Menu>
    </div>
  );
};

export default Notifications;
