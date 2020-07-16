import React from "react";
import styled from "styled-components";

const Btn = styled.button`
  font-size: 2rem;
  padding: 0.5rem 1rem;
  border: ${(props) =>
    props.variant === "filled" || props.variant === "contained"
      ? `solid 1px ${props.theme.colors.black}`
      : "none"};
  outline: none;
  border-radius: ${(props) =>
    props.variant === "filled" || props.variant === "contained"
      ? "0.2rem"
      : "0"};
  text-align: center;
  cursor: pointer;
  color: ${(props) =>
    props.variant === "filled" && props.color === "white"
      ? props.theme.colors.black
      : props.variant === "filled"
      ? props.theme.colors.white
      : props.theme.colors.black};
  background-color: ${(props) =>
    props.variant === "filled" && props.color === "white"
      ? props.theme.colors.white
      : props.variant === "filled"
      ? props.theme.colors.black
      : "transparent"};
  transition: all 0.5s;
  &:not(:last-child) {
    margin-right: 2rem;
  }
  &:hover {
    color: ${(props) =>
      props.variant === "filled"
        ? props.theme.colors.white
        : props.theme.colors.black};
    background-color: ${(props) =>
      props.variant === "contained"
        ? "#f7f7f7"
        : props.variant === "filled"
        ? props.theme.colors.primary
        : "transparent"};
    border-bottom: ${(props) =>
      !props.variant ? `solid 1px ${props.theme.colors.black}` : null};
    border: ${(props) =>
      props.variant === "filled" ? `solid 1px ${props.theme.colors.primary} ` : null};
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
    <Btn
      color={color}
      onClick={onClick}
      variant={variant}
      className={className}
    >
      {children}
    </Btn>
  );
}
