import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import Button from "../utility/Button";
import InputGroup from "../utility/InputGroup";

const Container = styled.div`
  width: 30rem;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`;

const Form = styled.form`
  width: 100%;
  padding: 5rem 1rem;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 1rem;
  margin-left: auto;
`;

const Group = styled.div`
  width: 100%;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const Label = styled.label`
  font-size: 1.6rem;
  font-weight: 700;
`;

const Input = styled.input`
  margin-top: 1rem;
  width: 100%;
  padding: 1rem;
  font-size: 1.6rem;
`;

const Btn = styled(Button)`
  width: 100%;
`;

const ErrorMessage = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
  color: red;
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // redirect once logged in
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();

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
          console.log(error);
        });
    }
  };

  return redirect ? (
    <Redirect to="/users/dashboard" />
  ) : (
    <Container>
      <Form className="box-shadow" onSubmit={onSubmit}>
        <Group>
          <Label>Email</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@gmail.com"
          />
        </Group>
        <Group>
          <Label>Password</Label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Group>
        {error ? (
          <Group>
            <ErrorMessage>{error}</ErrorMessage>
          </Group>
        ) : null}
        <Group>
          <Btn variant="filled">Login</Btn>
        </Group>
      </Form>
    </Container>
  );
}
