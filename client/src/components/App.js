import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import NavBar from "./nav/NavBar";
import Container from "./utility/Container";
import CreateUser from "./users/CreateUser";
import Login from "./users/Login";
import ProtectedRoute from "./utility/ProtectedRoute";
import Dashboard from "./users/Dashboard";
import Landing from "./Landing";
import RestaurantMenu from "./restaurant/Menu";
import GlobalStyles from "../GlobalStyle";

const THEME = {
  colors: {
    primary: "#F10C45",
    secondary: "#9a1750",
    white: "#FFFFFF",
    black: "#000000",
    grey: "#7D7F7C",
  },
};

export default function App() {
  const auth = useSelector((state) => state.auth);
  return (
    <ThemeProvider theme={THEME}>
      <Router>
        <GlobalStyles />
        <NavBar />
        <Container>
          <Route path="/" exact component={Landing} />
          <Route path="/users/create" exact component={CreateUser} />
          <Route path="/users/login" exact component={Login} />
          <Route path="/users/dashboard" exact component={Dashboard} />
          {/* <ProtectedRoute
            exact
            to="/users/dashboard"
            component={Dashboard}
            auth={auth.isSignedIn}
          /> */}
          <Route path="/restaurant/:id" exact component={RestaurantMenu} />
        </Container>
      </Router>
    </ThemeProvider>
  );
}
