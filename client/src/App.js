import React, { useState } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { userContext } from "./context/userContext";

import { theme } from "./themes/theme";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import "./App.css";

function App() {
  const [user, setUser] = useState({});

  const logout = () => {
    return; // placeholder
  };

  const value = {
    user: user,
    setUser: setUser,
    logout: logout
  };

  return (
    <userContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </BrowserRouter>
      </MuiThemeProvider>
    </userContext.Provider>
  );
}

export default App;
