import React, { useState, useMemo, useEffect } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { authJWT } from "./functions/jwt";
import { theme } from "./themes/theme";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
    // TODO: delete token from localStorage as well
  };

  const value = useMemo(
    () => ({
      user: user,
      setUser: setUser,
      logout: logout
    }),
    [user, setUser]
  );

  // On mount, check local token for user
  useEffect(() => {
    let token = localStorage.getItem("peercode-auth-token");
    let decodedToken = authJWT(token);
    let user = decodedToken.user;
    setUser(user);
  }, []);

  return (
    <UserContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Home} />
        </BrowserRouter>
      </MuiThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
