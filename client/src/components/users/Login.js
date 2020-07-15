import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import Button from "../utility/Button";
import InputGroup from "../utility/InputGroup";
import Food from "../../images/plate.svg";

const Container = styled.div`
  width: 80vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Heading = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
`;

const Image = styled.img`
  width: 39rem;
  text-align: center;
  transform: translateY(4px);
  z-index: -10;
  @media(max-width: 800px) {
    width: 29rem;
  }
`;

const Form = styled.form`
  width: 40rem;
  padding: 5rem 1rem;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 1rem;
  @media(max-width: 800px) {
    width: 30rem;
  }
`;

const Group = styled.div`
  width: 100%;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const Btn = styled(Button)`
  width: 100%;
`;

const ErrorMessage = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
  color: red;
`;

const StyledInputGroup = styled(InputGroup)`
  margin-bottom: 2rem;
`;

export default function Login() {
  const dispatch = useDispatch();
  // hook up current path to state
  useEffect(() => {
    dispatch({
      type: "CURRENT_PATH",
      payload: "login",
    });
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // redirect once logged in
  const [redirect, setRedirect] = useState(false);

  //form submission
  const onSubmit = (e) => {
    e.preventDefault();
    //email regex
    const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    //form validation
    if (!email || !password) {
      setError("Please enter all fields.");
    } else if (!emailPattern.test(email)) {
      setError("Please enter a valid email");
    } else {
      const data = { email, password };
      axios
        .post("/users/login", data)
        .then((response) => {
          if (response.data.message) {
            setError(response.data.message);
          } else {
            dispatch({
              type: "SIGN_IN",
              payload: response.data,
            });
            setRedirect(true);
          }
        })
        .catch((error) => {
        });
    }
  };

  return redirect ? (
    <Redirect to="/users/dashboard" />
  ) : (
    <Container>
      <Image src={Food} alt="Plate of food" />
      <Form className="box-shadow" onSubmit={onSubmit}>
        <Heading>Log In</Heading>
        <StyledInputGroup
          value={email}
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="johndoe@gmail.com"
        />
        <StyledInputGroup
          value={password}
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error ? (
          <Group>
            <ErrorMessage>{error}</ErrorMessage>
          </Group>
        ) : null}
        <Group>
          <Btn variant="filled">Log In</Btn>
        </Group>
      </Form>
    </Container>
  );
}
