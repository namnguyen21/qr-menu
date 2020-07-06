import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Button from "../utility/Button";
import InputGroup from "../utility/InputGroup";

const Container = styled.div`
  width: 60rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Form = styled.form`
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  padding: 5rem 3rem;
  border-radius: 1rem;
  /* -webkit-box-shadow: 6px 4px 26px -6px rgba(0, 0, 0, 0.66);
  -moz-box-shadow: 6px 4px 26px -6px rgba(0, 0, 0, 0.66);
  box-shadow: 6px 4px 26px -6px rgba(0, 0, 0, 0.66); */
`;

const Group = styled.div`
  width: 100%;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const StyledInputGroup = styled(InputGroup)`
  &:not(:last-child){
    margin-bottom: 1rem;
  }
`

const Btn = styled(Button)`
  width: 100%;
`;

const ErrorMessage = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
  color: red;
`;

export default function CreateUser() {
  //input fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  // redirect for login once succesful creation
  const [redirect, setRedirect] = useState(false);

  const onSubmit = (e) => {
    //regex email validation
    const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    e.preventDefault();
    setError("");
    // form validation
    if (!name || !email || !restaurant || !phone || !password || !password) {
      setError("Please enter all fields.");
    } else if (!emailPattern.test(email)) {
      setError("Please enter a valid email");
    } else if (password !== rePassword) {
      setError("Passwords must match");
    } else {
      const data = {
        name,
        email,
        restaurant,
        phone,
        password,
      };
      setError("");
      axios.post("/users/create", data).then((response) => {
        if (response.data.message) {
          //error
          setError(response.data.message);
        } else {
          setRedirect(true);
        }
      });
    }
  };

  return redirect ? (
    <Redirect to="/users/login" />
  ) : (
    <Container>
      <Form className='box-shadow' onSubmit={onSubmit}>
        <StyledInputGroup
          style={{ marginBottom: "2rem" }}
          label="Name"
          value={name}
          type="text"
          placeholder="John Doe"
          onChange={(e) => setName(e.target.value)}
        />
        <StyledInputGroup
          style={{ marginBottom: "2rem" }}
          label="Email"
          value={email}
          placeholder="johndoe@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
          type="text"
        />
        {/* <Group>
          <Label>Email</Label>
          <Input
            placeholder="johndoe@gmail.com"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Group> */}
        {/* <Group>
          <Label>Email</Label>
          <Input
            placeholder="johndoe@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Group> */}
        <StyledInputGroup
          style={{ marginBottom: "2rem" }}
          label="Restaurant Name"
          value={restaurant}
          placeholder="In N Out"
          onChange={(e) => setRestaurant(e.target.value)}
          type="text"
        />
        {/* <Group>
          <Label>Restaurant Name</Label>
          <Input
            placeholder="In N Out"
            value={restaurant}
            onChange={(e) => setRestaurant(e.target.value)}
          />
        </Group> */}
        <StyledInputGroup
          style={{ marginBottom: "2rem" }}
          label="Phone Number"
          value={phone}
          placeholder="123-456-7890"
          onChange={(e) => setPhone(e.target.value)}
          type="text"
        />
        {/* <Group>
          <Label>Phone Number</Label>
          <Input
            placeholder="123-456-7890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Group> */}
        <StyledInputGroup
          style={{ marginBottom: "2rem" }}
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        {/* <Group>
          <Label>Password</Label>
          <Input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </Group> */}
        <StyledInputGroup
          style={{ marginBottom: "2rem" }}
          label="Re-enter Password"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          type="password"
        />
        {/* <Group>
          <Label>Re-enter Password</Label>
          <Input
            placeholder="Password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            type="password"
          />
        </Group> */}
        {error ? (
          <Group>
            <ErrorMessage>{error}</ErrorMessage>
          </Group>
        ) : null}
        <Group>
          <Btn variant="filled">Submit</Btn>
        </Group>
      </Form>
    </Container>
  );
}
