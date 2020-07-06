import React from "react";
import styled from "styled-components";

const Button = styled.div`
  height: 4rem;
  width: 4rem;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 50%;
  cursor: pointer;
  & i {
    color: ${(props) => props.theme.colors.white};
    font-size: 2rem;
  }
`;

export default function IconButton({ children, onClick }) {
  return <Button onClick={onClick}>{children}</Button>;
}
