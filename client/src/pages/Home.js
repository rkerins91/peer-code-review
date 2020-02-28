import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserContext } from "context/UserContext";
import { NavBar } from "components";
import CodeUpload from "./CodeUpload";
import Dashboard from "./Dashboard";
import Balance from "./Balance";

const Home = () => {
  // user context
  const { user, isLoading } = useContext(UserContext);

  if (!user && !isLoading) {
    return <Redirect to="/login" />;
  } else if (user && !user.experience) {
    // if the user has no experience set, redirect
    return <Redirect to="/experience" />;
  } else
    return (
      <>
        <NavBar></NavBar>
        <Switch>
          {/* <Route exact path="/" component={Profile} /> */}
          <Route path="/balance" component={Balance} />
          <Route path="/code-upload" component={CodeUpload} />
          <Route
            path="/dashboard/:typeParam/:threadParam"
            children={<Dashboard />}
          />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </>
    );
};

export default Home;
