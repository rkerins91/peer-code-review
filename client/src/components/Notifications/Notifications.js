import React, { useState, useEffect, useContext, useReducer } from "react";
import { Menu, MenuItem, makeStyles, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { UserContext } from "context/UserContext";
import axios from "axios";
import NotificationsNoneRoundedIcon from "@material-ui/icons/NotificationsNoneRounded";
import NotificationsActiveRoundedIcon from "@material-ui/icons/NotificationsActiveRounded";
import { blue } from "@material-ui/core/colors";
import socket from "functions/sockets";

const useStyles = makeStyles({
  notificationIcon: {
    color: "white"
  },
  activeNotificationIcon: {
    color: "#43DDC1"
  },
  menu: {
    backgroundColor: blue
  },
  link: {
    textDecoration: "none",
    color: "#43DDC1",
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

const initialState = {
  notifications: []
};

const reducer = (state, action) => {
  const updateUnread = () => {
    const unread = state.notifications.map(ele => {
      ele.seen = true;
      return ele;
    });
    axios.put(`/notifications/update-read`, { notifications: unread });
    return unread;
  };

  switch (action.type) {
    case "newNotification":
      return { notifications: [action.payload, ...state.notifications] };
    case "getNotifications":
      return { notifications: action.payload };
    case "setRead":
      return { notifications: updateUnread() };
    default:
      throw new Error("State update error");
  }
};

const Notifications = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const classes = useStyles();
  const [seen, setSeen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const getNotifications = async () => {
      const { data } = await axios.get(`/notifications/${user._id}`);
      dispatch({ type: "getNotifications", payload: data.reverse() });
    };
    getNotifications();
    socket.subscribe("notifications", handleSocketNotification);

    return () => socket.unsubscribe("notifications");
  }, []);

  const handleSocketNotification = notification => {
    dispatch({ type: "newNotification", payload: notification });
  };

  useEffect(() => {
    setSeen(state.notifications.every(ele => ele.seen === true));
  });

  const handleMenu = e => {
    setAnchorEl(e.currentTarget);
    setSeen(true);
  };

  const handleClose = () => {
    var updateRequired = false;
    for (let i = 0; i < state.notifications.length; i++) {
      if (!state.notifications[i].seen) {
        updateRequired = true;
        break;
      }
    }

    if (updateRequired) {
      dispatch({ type: "setRead" });
    }

    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        onClick={handleMenu}
        disabled={state.notifications.length < 1}
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
              className={classes.activeNotificationIcon}
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
        transformOrigin={{
          vertical: -40,
          horizontal: "right"
        }}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {state.notifications.map(ele => {
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
