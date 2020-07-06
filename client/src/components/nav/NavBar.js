import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../utility/Button";

const Nav = styled.nav`
  height: 5rem;
  width: 100vw;
  padding: 2rem 5rem;
  display: flex;
  justify-content: flex-end;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
`;

export default function NavBar() {
  return (
    <Nav>
      <ButtonGroup>
        <Link style={{ marginRight: "2rem" }} to="/users/login">
          <Button style={{ marginRight: "2rem" }}>Log In</Button>
        </Link>
        <Link to="/users/create">
          <Button variant="filled">Sign Up</Button>
        </Link>
      </ButtonGroup>
    </Nav>
  );
}
