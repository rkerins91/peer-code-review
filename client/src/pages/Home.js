import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Home = () => {
  // user context
  const { user, setUser } = useContext(UserContext);

  return <p> {"logged in as " + JSON.stringify(user)} </p>;
};

export default Home;
