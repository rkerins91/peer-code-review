import React, { useContext } from "react";
import { UserContext } from "context/UserContext";
import Profile from "../components/Profile";

const MyProfile = () => {
  // user context
  const { user } = useContext(UserContext);

  return <Profile user={user} />;
};

export default MyProfile;
