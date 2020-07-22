import React from "react";
import styled from "styled-components";

const Btn = styled.button`
  font-size: 2rem;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
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
        ? props.theme.colors.black
        : "transparent"};
    border-bottom: ${(props) =>
      !props.variant ? `solid 1px ${props.theme.colors.black}` : null};
    transform: ${(props) =>
      props.variant === "filled" ? "translate(-1px, -2px)" : null};
    -webkit-box-shadow: ${(props) =>
      props.variant === "filled"
        ? "10px 10px 41px -8px rgba(0, 0, 0, 0.75)"
        : null};
    -moz-box-shadow: ${(props) =>
      props.variant === "filled"
        ? "10px 10px 41px -8px rgba(0, 0, 0, 0.75)"
        : null};
    box-shadow: ${(props) =>
      props.variant === "filled"
        ? "10px 10px 41px -8px rgba(0, 0, 0, 0.75)"
        : null};
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
