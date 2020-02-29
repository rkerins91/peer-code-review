import React, { useState } from "react";
import { Menu, MenuItem, makeStyles } from "@material-ui/core";
import NotificationsNoneRoundedIcon from "@material-ui/icons/NotificationsNoneRounded";
import NotificationsActiveRoundedIcon from "@material-ui/icons/NotificationsActiveRounded";

const useStyles = makeStyles({
  notificationIcon: {
    color: "white"
  }
});
const Notifications = () => {
  const classes = useStyles();
  const [seen, setSeen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const dummyNotifications = [
    "A person reviewed your code",
    "You have a new assignment",
    "Someone commented on a post you are following"
  ];

  const handleMenu = e => {
    setAnchorEl(e.currentTarget);
    setSeen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          vertical: "bottom",
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
        {dummyNotifications.map(ele => {
          console.log(ele);
          return <MenuItem>{ele}</MenuItem>;
        })}
      </Menu>
    </div>
  );
};

export default Notifications;
