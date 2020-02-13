import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CodeUpload from "./pages/CodeUpload";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/code-upload" component={CodeUpload} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
