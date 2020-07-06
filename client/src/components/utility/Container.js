import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  @media (min-width: 1200px) {
    width: 100vw;
  }
  margin: auto;
  min-height: calc(100vh - 5rem);
  position: relative;
`;

export default function Container({ children }) {
  return <Wrapper>{children}</Wrapper>;
}
