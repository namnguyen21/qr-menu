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
import Demo from "../images/demo.gif";
import LazyLoad from "react-lazyload";

const Container = styled.div`
  height: 100%;
  width: 100vw;
  display: block;
  /* padding-bottom: 5rem; */
`;

const BackgroundDiv = styled.div`
  height: calc(80vh + 7.4rem);
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
  @media (min-width: 1000px) {
    display: grid;
    grid-template-columns: 20% 25% 50%;
  }
  @media(min-width: 800px) and (max-width: 1000px){
    display: grid;
    grid-template-columns: 40% 60%;
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
  @media (max-width: 1000px) {
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
    margin-top: 2rem;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 75%;
  /* > * {
    @media (min-width: 800px) {
      &:not(:last-child) {
        margin-bottom: 2rem;
      }
    }
  } */
`;

const HeroHeading = styled.h1`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 7rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.black};
  letter-spacing: 3px;
  margin-bottom: 2rem;
  line-height: 1;
  @media (max-width: 800px) {
    font-size: 5rem;
    margin-bottom: 1rem;
  }
`;

const HeroSubheading = styled.h2`
  font-size: 3rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
  margin-bottom: 2rem;
  @media (max-width: 800px) {
    margin-bottom: 1rem;
  }
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

const InstructionGrid = styled.div`
  width: 100%;
  display: flex;
  margin: auto;
  justify-content: space-evenly;
  align-items: middle;
  margin-bottom: 10rem;
  flex-wrap: wrap;
`;

const DemoGif = styled.img`
  width: 50rem;
  border-radius: 1rem;
  @media (max-width: 900px) {
    width: 100%;
    margin: auto;
    text-align: center;
    margin-bottom: 5rem;
  }
`;
const StyledLazyLoad = styled(LazyLoad)`
  width: 60rem;
  order: 1;
  @media (max-width: 900px) {
    order: 0;
    width: 90%;
    display: flex;
    justify-content: center;
  }
`;

const InstructionDiv = styled.ol`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 30rem;
  order: 0;
  @media (max-width: 900px) {
    order: 1;
  }
`;

const InstructionText = styled.li`
  font-size: 2.5rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.grey};
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const StyledButton = styled(Button)`
  font-size: 2.5rem;
  border: none;
  background-color: ${(props) => props.theme.colors.black};
  color: ${(props) => props.theme.colors.white};
  border-radius: 4rem;
  padding: 1rem 2rem;
  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
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
          <HeroHeading>Helping restaurants fight COVID-19</HeroHeading>
          <HeroSubheading>
            Ditch your old menus and go paperless.
          </HeroSubheading>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link to="/users/create">
              <StyledButton variant="filled">Get Started</StyledButton>
            </Link>
          </div>
        </Content>
      </Hero>
      <InstructionGrid>
        <InstructionDiv>
          <InstructionText>Create an account and log in</InstructionText>
          <InstructionText>Add items to your menu</InstructionText>
          <InstructionText>
            Download and print a QR code to display within your restaurant
          </InstructionText>
        </InstructionDiv>
        <StyledLazyLoad>
          <DemoGif className="box-shadow" src={Demo} alt="Login image" />
        </StyledLazyLoad>
      </InstructionGrid>
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
    </Container>
  );
}
