import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  @media (max-width: 800px) {
    display: none;
  }
`;

const Ul = styled.ul`
  list-style: none;
`;

const Li = styled.li`
  margin: 1rem 0;
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

export default function AccountPanel() {
  const user = useSelector((state) => state.auth);
  const menu = useSelector((state) => state.menu.items);

  return (
    <Container>
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
    </Container>
  );
}
