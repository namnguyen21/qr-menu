import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import HttpsRedirect from "react-https-redirect";

import NavBar from "./nav/NavBar";
import Container from "./utility/Container";
import CreateUser from "./users/CreateUser";
import Login from "./users/Login";
import ProtectedRoute from "./utility/ProtectedRoute";
import Dashboard from "./users/Dashboard";
import Landing from "./Landing";
import RestaurantMenu from "./restaurant/Menu";
import GlobalStyles from "../GlobalStyle";
import UploadCsv from "./users/UploadCsv"
import Footer from "./utility/Footer";

const THEME = {
  colors: {
    primary: "#F10C45",
    secondary: "#20C073",
    white: "#FFFFFF",
    black: "#070D0D",
    grey: "#425466",
    lightGrey: "#949494",
  },
  fonts: {
    logo: "'Fredoka One', cursive",
    heading: "'Roboto', sans-serif",
  },
};

export default function App() {
  const auth = useSelector((state) => state.auth);
  return (
    <HttpsRedirect>
      <ThemeProvider theme={THEME}>
        <Router>
          <GlobalStyles />
          <NavBar />
          <Container>
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/users/create" exact component={CreateUser} />
              <Route path="/users/login" exact component={Login} />
              <Route path="/restaurant/:id" exact component={RestaurantMenu} />
              <Route path="/users/dashboard" exact component={Dashboard} />
              <Route path="/users/upload/csv" exact component={UploadCsv} />
              {/* <ProtectedRoute
                exact
                to="/users/dashboard"
                component={Dashboard}
                auth={auth.isSignedIn}
              /> */}
            </Switch>
          </Container>
          <Footer />
        </Router>
      </ThemeProvider>
    </HttpsRedirect>
  );
}
