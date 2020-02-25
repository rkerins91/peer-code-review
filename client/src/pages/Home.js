import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserContext } from "context/UserContext";
import { NavBar } from "components";
import CodeUpload from "./CodeUpload";
import ReviewPage from "./Review";
import Experience from "./Experience";
import Balance from "./Balance";
import Loading from "../components/Loading";

const Home = () => {
  // user context
  const { user, isLoading } = useContext(UserContext);

  if (!user && !isLoading) {
    return <Redirect to="/login" />;
  } else
    return (
      <>
        <NavBar></NavBar>
        <Switch>
          {/* <Route exact path="/" component={Profile} /> */}
          <Route path="/experience" component={Experience} />
          <Route path="/balance" component={Balance} />
          <Route path="/code-upload" component={CodeUpload} />
          <Route path="/reviews" component={ReviewPage} />
        </Switch>
      </>
    );
};

export default Home;
