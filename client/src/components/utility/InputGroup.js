import React from "react";
import styled from "styled-components";

const Group = styled.div`
  width: 100%;
`;

const Label = styled.label`
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.grey};
  margin-left: 1rem;
  font-weight: 700;
`;

const Input = styled.input`
  width: 100%;
  font-size: 2rem;
  padding: 0.5rem 1rem;
  outline: none;
  border: none;
  background-color: hsl(210, 9%, 96%);
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  &::placeholder {
    font-weight: 100;
    letter-spacing: 1.5;
  }
  &:focus {
    box-shadow: 0 0 1pt 1pt blue;
  }
`;

export default function InputGroup({
  label,
  value,
  onChange,
  className,
  placeholder,
  type,
}) {
  return (
    <Group className={className}>
      {label ? <Label>{label}</Label> : null}
      <Input
        type={type}
        // placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </Group>
  );
}
