import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  margin: auto;
  min-height: calc(100vh - 5rem);
  /* @media(min-width: 800px) {
    width: 90vw;
  } */
`;

export default function Container({ children }) {
  return <Wrapper>{children}</Wrapper>;
}
