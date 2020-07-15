import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import QrCode from "../images/qr.svg";
import Phone from "../images/iphone.png";
import Button from "./utility/Button";
import Background from "../images/gradient-background.svg";
import Soap from "../images/hand-sanitizer.svg";
import Pencil from "../images/pencil.svg";
import Clock from "../images/clock.svg";
import User from "../images/user.svg";
import Form from "../images/form.svg";

const Container = styled.div`
  height: 100%;
  width: 100vw;
  display: block;
  padding-bottom: 5rem;
`;

const BackgroundDiv = styled.div`
  height: 90vh;
  width: 100vw;
  position: absolute;
  top: -1%;
  left: 0%;
  background-image: url(${Background});
  background-size: cover;
  background-position: center;
  z-index: -99999;
  @media (max-width: 800px) {
    height: 100vh;
  }
`;

const Hero = styled.div`
  height: 80vh;
  width: 100vw;
  /* background-color: ${(props) => props.theme.colors.primary}; */
  position: relative;
  @media (min-width: 800px) {
    display: grid;
    grid-template-columns: 20% 25% 50%;
  }
  @media (max-width: 800px) {
    display: block;
    padding: 0 2rem;
    height: 70vh;
  }
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
  @media (max-width: 800px) {
    display: none;
  }
`;

const Content = styled.div`
  @media (min-width: 800px) {
    margin-top: 5rem;
  }
`;

const HeroHeading = styled.h1`
  font-family: ${(props) => props.theme.fonts.logo};
  font-size: 6rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.6);
  letter-spacing: 3px;
  line-height: 1;
  margin-bottom: 2rem;
  @media (max-width: 800px) {
    font-size: 5rem;
  }
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
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
`;

const CardContainer = styled.div`
  /* margin-top: 20rem; */
  display: flex;
  width: 100%;
  @media (min-width: 800px) {
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    justify-content: space-evenly;
  }
  margin-bottom: 10rem;
`;

const ToolCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  justify-items: flex-start;
  background: transparent;
  border-radius: 1rem;
  /* padding: 2rem 1rem; */
  @media (min-width: 800px) {
    width: 25%;
  }
  @media (max-width: 800px) {
    width: 80%;
    margin: auto;
  }
`;

const CardIcon = styled.img`
  height: 5rem;
  text-align: center;
  margin: auto;
  display: block;
`;

const CardHeader = styled.h3`
  font-size: 3rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.black};
`;

const CardDescription = styled.div`
  width: 100%;
  font-size: 2rem;
  color: ${(props) => props.theme.colors.grey};
  text-align: center;
`;

const InstructionContainer = styled.div`
  width: 60%;
  margin: 0 auto 5rem;
  display: grid;
  grid-template-rows: auto auto auto;
  row-gap: 3rem;
  @media (max-width: 800px) {
    width: 90%;
  }
`;

const InstructionHeading = styled.h3`
  font-size: 3.5rem;
  text-align: center;
  color: ${(props) => props.theme.colors.black};
  margin-bottom: 5rem;
`;

const InstructionRow = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  align-items: flex-start;
`;

const InstructionColumn = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  color: ${(props) => props.theme.colors.grey};
`;

const InstructionIcon = styled.img`
  height: 5rem;
`;

const StyledButton = styled(Button)`
  font-size: 2.5rem;
  border: none;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  border-radius: 4rem;
  padding: 1rem 2rem;
  &:hover {
    background-color: ${(props) => props.theme.colors.white};
  }
`;

export default function Landing() {
  // hook up current path to state
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "CURRENT_PATH",
      payload: "landing",
    });
  });

  return (
    <Container>
      <BackgroundDiv />
      <Hero>
        <QR src={QrCode} alt="QR Code" />
        <PhoneImg src={Phone} alt="iPhone Image" />
        <Content>
          <HeroHeading>Snap Menu</HeroHeading>
          <HeroSubheading>
            Ditch your old menus and go paperless.
          </HeroSubheading>
          <HeroDescription>
            COVID-19 has created many problems for the restaurant industry.
            Eliminate one of those problems by going digital with your menu.
          </HeroDescription>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link to="/users/create">
              <StyledButton variant="filled">Get Started</StyledButton>
            </Link>
          </div>
        </Content>
      </Hero>
      <CardContainer>
        <ToolCard>
          <CardIcon src={Soap} alt="Hand Sanitizer" />
          <CardHeader>Clean</CardHeader>
          <CardDescription>
            Eliminate the need for sanitizing old paper menus.
          </CardDescription>
        </ToolCard>
        <ToolCard>
          <CardIcon src={Clock} alt="Clock" />
          <CardHeader>Accessible</CardHeader>
          <CardDescription>
            QR codes allow for instant mobile access to your restaurant's menu
            and will cut down wait times.
          </CardDescription>
        </ToolCard>
        <ToolCard>
          <CardIcon src={Pencil} alt="Pencil" />
          <CardHeader>Easy to Manage</CardHeader>
          <CardDescription>
            Easily create and update your menu. Adjust menu items and prices any
            time you want.
          </CardDescription>
        </ToolCard>
      </CardContainer>
      <InstructionHeading>Easy as 3 Simple Steps</InstructionHeading>
      <InstructionContainer>
        <InstructionRow>
          <InstructionColumn>
            <InstructionIcon src={User} alt="User" />
          </InstructionColumn>
          <InstructionColumn>
            Create an account with your business's information.
          </InstructionColumn>
        </InstructionRow>
        <InstructionRow>
          <InstructionColumn>
            <InstructionIcon src={Form} alt="Form" />
          </InstructionColumn>
          <InstructionColumn>
            Add your menu's items through your user portal.
          </InstructionColumn>
        </InstructionRow>
        <InstructionRow>
          <InstructionColumn>
            <InstructionIcon src={QrCode} alt="Qr code" />
          </InstructionColumn>
          <InstructionColumn>
            Download a QR code that corresponds to your restaurant's menu and
            display in your restaurant!
          </InstructionColumn>
        </InstructionRow>
      </InstructionContainer>
    </Container>
  );
}
