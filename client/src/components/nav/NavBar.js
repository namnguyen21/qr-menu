import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "../utility/Button";

const Nav = styled.nav`
  width: 100vw;
  padding: 1rem 5rem;
  display: flex;
  justify-content: space-between;
  position: relative;
  min-height: 5rem;
  @media (max-width: 800px) {
    padding: 2rem;
  }
`;

const Logo = styled.h1`
  font-size: 3rem;
  font-family: ${(props) => props.theme.fonts.logo};
  color: ${(props) => props.theme.colors.black};
`;

const ButtonGroup = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
`;

const LandingPageNavButton = styled(Link)`
  color: ${(props) => props.theme.colors.white};
  font-size: 2rem;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    border-bottom: solid 1px #fff;
  }
  @media (max-width: 800px) {
    display: none;
  }
`;

const LandingPageSignUp = styled.button`
  background-color: ${(props) => props.theme.colors.white};
  padding: 0.5rem 2rem;
  font-size: 2rem;
  color: ${(props) => props.theme.colors.primary};
  border: none;
  outline: none;
  border-radius: 0.2rem;
  margin-left: 2rem;
  cursor: pointer;
  &:hover {
    -webkit-box-shadow: 0px 0px 44px -5px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 44px -5px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 44px -5px rgba(0, 0, 0, 0.75);
  }
  @media (max-width: 800px) {
    margin-right: 2rem;
  }
`;

const Hamburger = styled.div`
  height: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* position: absolute;
  top: 2rem;
  right: 2rem; */
  @media (min-width: 800px) {
    display: none;
  }
  cursor: pointer;
`;

const Burger = styled.span`
  height: 0.2rem;
  width: 3rem;
  background-color: ${(props) =>
    props.path === "landing"
      ? props.theme.colors.white
      : props.theme.colors.primary};
`;

const Menu = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  /* width: 90vw; */
  height: ${(props) => (props.open ? "35rem" : "0px")};
  position: absolute;
  top: 2rem;
  left: ${(props) => (props.open ? "1rem" : "100%")};
  right: 1rem;
  /* transform: translateX(-50%); */
  /* width: ${(props) => (props.open ? "35rem" : "0px")}; */
  transition: all 0.3s;
  z-index: 9999;
  display: ${(props) => (props.open ? "flex" : null)};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  -webkit-box-shadow: 0px 10px 114px -10px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 10px 114px -10px rgba(0,0,0,0.75);
box-shadow: 0px 10px 114px -10px rgba(0,0,0,0.75);
`;

const StyledLink = styled(Link)`
  margin-right: 2rem;
  @media (max-width: 800px) {
    display: none;
  }
`;

const Exit = styled.span`
  font-size: 3rem;
  color: ${(props) => props.theme.colors.primary};
  position: absolute;
  top: 1rem;
  right: 2rem;
  z-index: 9999999;
  display: ${(props) => (props.open ? "inline-block" : "none")};

  cursor: pointer;
  i {
    color: ${(props) => props.theme.colors.primary};
    font-size: 3rem;
  }
`;

const Group = styled.div`
  margin: auto auto;
  display: flex;
  flex-direction: column;
`;

const RespNavLink = styled(Link)`
  display: ${(props) => (!props.open ? "none" : null)};
  font-size: 3rem;
  text-align: center;
  text-decoration: none;
  &:not(:last-child) {
    margin-bottom: 5rem;
  }
  color: ${(props) => props.theme.colors.primary};
`;

const RespSignUpButton = styled(Link)`
  @media (max-width: 800px) {
    margin-right: 2rem;
  }
`;

const HomeSignOutButton = styled(Button)`
  color: ${(props) => props.theme.colors.white};
  &:hover {
    color: ${(props) => props.theme.colors.white};
    border-bottom: solid 1px ${(props) => props.theme.colors.white};
  }
`;

export default function NavBar() {
  // get current path
  const currentPath = useSelector((state) => state.path.path);

  // opening responsive navbar
  const [open, setOpen] = useState(false);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSignOut = () => {
    dispatch({
      type: "SIGN_OUT",
    });
  };

  return (
    <Nav>
      <Menu open={open}>
        <Exit onClick={() => setOpen(!open)} open={open}>
          <i className="fas fa-times"></i>
        </Exit>
        <Group>
          <RespNavLink
            onClick={() => setOpen(false)}
            open={open}
            to="/users/login"
          >
            Log In
          </RespNavLink>
          <RespNavLink
            onClick={() => setOpen(false)}
            open={open}
            to="/users/create"
          >
            Sign Up
          </RespNavLink>
        </Group>
      </Menu>
      {currentPath !== "landing" ? (
        <React.Fragment>
          <Link style={{ textDecoration: "none" }} to="/">
            <Logo>Tiny Menu</Logo>
          </Link>

          <ButtonGroup>
            {auth.isSignedIn ? (
              <Button onClick={onSignOut}>Sign Out</Button>
            ) : (
              <React.Fragment>
                <StyledLink style={{ marginRight: "2rem" }} to="/users/login">
                  <Button color="white" style={{ marginRight: "2rem" }}>
                    Log In
                  </Button>
                </StyledLink>
                <RespSignUpButton to="/users/create">
                  <Button variant="filled">Sign Up</Button>
                </RespSignUpButton>
                <Hamburger onClick={() => setOpen(!open)}>
                  <Burger />
                  <Burger />
                  <Burger />
                </Hamburger>
              </React.Fragment>
            )}
          </ButtonGroup>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div style={{ height: "1px", width: "1px", display: "block" }}></div>
          <ButtonGroup>
            {auth.isSignedIn ? (
              <HomeSignOutButton onClick={onSignOut}>
                Sign Out
              </HomeSignOutButton>
            ) : (
              <React.Fragment>
                <LandingPageNavButton to="/users/login">
                  Log In
                </LandingPageNavButton>

                <Link to="/users/create">
                  <LandingPageSignUp>Sign Up</LandingPageSignUp>
                </Link>
                <Hamburger onClick={() => setOpen(!open)}>
                  <Burger path={currentPath} />
                  <Burger path={currentPath} />
                  <Burger path={currentPath} />
                </Hamburger>
              </React.Fragment>
            )}
          </ButtonGroup>
        </React.Fragment>
      )}
    </Nav>
  );
}
