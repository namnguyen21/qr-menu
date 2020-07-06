import React from "react";
import styled from "styled-components";
import QrCode from "../images/qr.svg";
import Phone from "../images/iphone.png";
import Button from "./utility/Button";

const Container = styled.div`
  height: 100%;
  width: 100vw;
  display: block;
  /* position: absolute;
  top: -5rem;
  left: 0;
  z-index: -999999; */
  background-color: ${(props) => props.theme.colors.primary};
`;

const Hero = styled.div`
  height: 40rem;
  width: 100vw;
  background-color: ${(props) => props.theme.colors.primary};
  position: relative;
  display: grid;
  grid-template-columns: 20% 25% 50%;
  padding: 2rem;
`;

const QR = styled.img`
  height: 10rem;
  width: 10rem;
  /* position: absolute;
  bottom: 5rem;
  left: 15rem; */
  margin-left: auto;
  margin-top: 80%;
  @media (max-width: 800px) {
    display: none;
  }
`;

const PhoneImg = styled.img`
  width: 25rem;
  margin-bottom: -7.5rem;
  margin: 0 auto -7.5rem;
  -webkit-filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.8));
  filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.8));
`;

const Content = styled.div`
  margin-left: auto;
  position: absolute;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);
  display: inline-block;
  max-width: 50%;
`;

const HeroHeading = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.white};
  letter-spacing: 3px;
  margin-bottom: 2rem;
`;

const HeroSubheading = styled.h2`
  font-size: 3.7rem;
  color: ${(props) => props.theme.colors.white};
  font-weight: 400;
  margin-bottom: 2rem;
`;

const HeroDescription = styled.p`
  font-size: 2.5rem;
  font-weight: 400;
  color: hsl(345, 97%, 96%);
`;

export default function Landing() {
  return (
    <Container>
      <Hero>
        <QR src={QrCode} alt="QR Code" />
        <PhoneImg src={Phone} alt="iPhone Image" />
        <Content>
          <HeroHeading>QR Menu</HeroHeading>
          <HeroSubheading>
            Ditch your old menus and go paperless.
          </HeroSubheading>
          <HeroDescription>
            Quick, easy, and eliminates the need for sanitizing menus.
            <Button variant="filled" color="white">
              Get Started
            </Button>
          </HeroDescription>
        </Content>
      </Hero>
    </Container>
  );
}
