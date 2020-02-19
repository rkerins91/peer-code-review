import React, { useContext } from "react";
import { UserContext } from "context/UserContext";
import { NavBar } from "components";

const Home = () => {
  // user context
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <NavBar></NavBar>
    </>
  );
};

export default Home;
