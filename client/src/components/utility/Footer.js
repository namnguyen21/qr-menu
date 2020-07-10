import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  width: 100vw;
  flex-shrink: 0;
`;

const Foot = styled.footer`
  display: block;
  width: 100%;
  height: 5rem;
  background-color: ${(props) => props.theme.colors.primary};
`;

export default function Footer() {
  return (
    <FooterContainer>
      <Foot></Foot>
    </FooterContainer>
  );
}
