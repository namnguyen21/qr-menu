import React from "react";
import styled from "styled-components";
import Button from "./Button";

const Wrapper = styled.form`
  width: 100%;
  border: solid 1px #cccccc;
`;

const Group = styled.div`
  width: 100%;
`;

const Label = styled.label`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.black};
`;

const Input = styled.input`
  height: 2rem;
  font-size: 1.6rem;
  outline: none;
  &:focus {
    outline: ${(props) => props.theme.colors.primary};
  }
`;

const Btn = styled(Button)`
  width: 100%;
`;

export default function Form({ fields, onSubmit }) {
  return (
    <Wrapper>
      {fields
        ? fields.map((field) => (
            <Group>
              <Label>{field.name}</Label>
              <Input
                placeholder={field.name}
                onChange={field.onChange}
                value={field.value}
              ></Input>
            </Group>
          ))
        : null}
      <Group>
        <Btn>Submit</Btn>
      </Group>
    </Wrapper>
  );
}
