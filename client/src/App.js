import React, { useState, useMemo } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { SnackbarProvider } from "notistack";

import { theme } from "./themes/theme";
import Experience from "./pages/Experience";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CodeUpload from "./pages/CodeUpload";
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

  return (
    <UserContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={4}>
          <BrowserRouter>
            <Route path="/signup" component={Signup} signupUser={setUser} />
            <Route path="/login" component={Login} />
            <Route path="/experience" component={Experience} />
            <Route exact path="/" component={Home} />
            <Route path="/code-upload" component={CodeUpload} />
          </BrowserRouter>
        </SnackbarProvider>
      </MuiThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
