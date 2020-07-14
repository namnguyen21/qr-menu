import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import InputGroup from "../utility/InputGroup";
import Button from "../utility/Button";
import User from "../classes/User";

const Container = styled.div`
  width: 100%;
  @media (max-width: 800px) {
    display: none;
  }
  position: relative;
  padding: 1rem 4rem 1rem 0;
`;

const Ul = styled.ul`
  list-style: none;
`;

const Li = styled.li`
  margin-top: 0.5rem;
`;

const Label = styled.label`
  font-size: 1.6rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.grey};
`;

const Info = styled.p`
  font-size: 2rem;
  color: ${(props) => props.theme.colors.black};
`;

const EditIcon = styled.i`
  font-size: 2rem;
  color: #ccc;
  position: absolute;
  top: 1rem;
  right: 40%;
  cursor: pointer;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

export default function AccountPanel() {
  const user = useSelector((state) => state.auth);
  const menu = useSelector((state) => state.menu.items);

  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [restaurant, setRestaurant] = useState(user.restaurant);
  const [phone, setPhone] = useState(user.phone);

  const dispatch = useDispatch();

  const onEditSubmit = () => {
    const newUser = new User(user.id);
    newUser
      .editUser({
        name,
        email,
        restaurant,
        phone,
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "EDIT_USER",
            payload: response.data,
          });
          setEdit(false);
        }
      });
  };

  return (
    <Container>
      {edit ? (
        <Ul>
          <Li>
            <InputGroup
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </Li>
          <Li>
            <InputGroup
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
          </Li>
          <Li>
            <InputGroup
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
            />
          </Li>
          <Li>
            <InputGroup
              label="Restaurant"
              value={restaurant}
              onChange={(e) => setRestaurant(e.target.value)}
              type="text"
            />
          </Li>
          <Li>
            <Flex>
              <Button onClick={() => setEdit(false)}>Cancel</Button>
              <Button onClick={onEditSubmit} variant="filled">
                Submit
              </Button>
            </Flex>
          </Li>
        </Ul>
      ) : (
        <React.Fragment>
          <EditIcon
            onClick={() => setEdit(!edit)}
            className="fas fa-pencil-alt"
          ></EditIcon>
          <Ul>
            <Li>
              <Label>Name</Label>
              <Info>{user.name}</Info>
            </Li>
            <Li>
              <Label>Email</Label>
              <Info>{user.email}</Info>
            </Li>
            <Li>
              <Label>Phone</Label>
              <Info>{user.phone}</Info>
            </Li>
            <Li>
              <Label>Restaurant</Label>
              <Info>{user.restaurant}</Info>
            </Li>
            <Li>
              <Label>Menu Items</Label>
              <Info>{menu.length}</Info>
            </Li>
          </Ul>
        </React.Fragment>
      )}
    </Container>
  );
}
