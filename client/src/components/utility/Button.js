import React from "react";
import styled from "styled-components";

const Btn = styled.button`
  font-size: 2rem;
  padding: 0.5rem 1rem;
  border: ${(props) =>
    props.variant === "filled" || props.variant === "contained"
      ? `solid 1px ${props.theme.colors.primary}`
      : "none"};
  outline: none;
  border-radius: ${(props) =>
    props.variant === "filled" || props.variant === "contained"
      ? "0.5rem"
      : "0"};
  text-align: center;
  cursor: pointer;
  color: ${(props) =>
    props.variant === "filled" && props.color === 'white'
      ? props.theme.colors.primary : props.variant==='filled'? props.theme.colors.white
      : props.theme.colors.primary};
  background-color: ${(props) =>
    props.variant === "filled" && props.color === "white"
      ? props.theme.colors.white
      : props.variant === "filled"
      ? props.theme.colors.primary
      : "transparent"};
  transition: all 0.5s;
  &:not(:last-child) {
    margin-right: 2rem;
  }
  &:hover {
    color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) =>
      props.variant === "contained" ? "#f7f7f7" : "transparent"};
    border-bottom: ${(props) =>
      !props.variant ? `solid 1px ${props.theme.colors.primary}` : null};
  }
  i {
    font-size: 2rem;
  }
`;

export default function Button({
  variant,
  children,
  onClick,
  className,
  color,
}) {
  return (
    <Btn color={color} onClick={onClick} variant={variant} className={className}>
      {children}
    </Btn>
  );
}
