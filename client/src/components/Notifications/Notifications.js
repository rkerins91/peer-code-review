import React, { useState, useEffect, useContext } from "react";
import { Menu, MenuItem, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { UserContext } from "context/UserContext";
import axios from "axios";
import NotificationsNoneRoundedIcon from "@material-ui/icons/NotificationsNoneRounded";
import NotificationsActiveRoundedIcon from "@material-ui/icons/NotificationsActiveRounded";

const useStyles = makeStyles({
  notificationIcon: {
    color: "white"
  },
  link: {
    textDecoration: "none",
    color: "#6E3ADB"
  }
});
const Notifications = () => {
  const classes = useStyles();
  const [seen, setSeen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const open = Boolean(anchorEl);

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const getNotifications = async () => {
      const { data } = await axios.get(`/notifications/${user._id}`);
      setNotifications(data);
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

  return (
    <div>
      <div onClick={handleMenu}>
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
      </div>
      <Menu
        id="notification-bell"
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: "center"
        }}
        keepMounted
        transformOrigin={{
          vertical: -40,
          horizontal: "right"
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {notifications.map(ele => {
          return (
            <Link to={ele.link} className={classes.link} key={ele._id}>
              <MenuItem>{ele.message}</MenuItem>
            </Link>
          );
        })}
      </Menu>
    </div>
  );
};

export default Notifications;
