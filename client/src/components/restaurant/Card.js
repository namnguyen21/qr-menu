import React from "react";
import styled from "styled-components";
import LazyLoad from "react-lazyload";

const CardWrapper = styled.div`
  @media (min-width: 800px) {
    width: 25rem;
    margin: 2rem;
  }
  @media (max-width: 800px) {
    width: 80%;
    margin: 2rem auto;
  }
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  border-radius: 1rem;
  background-color: ${(props) => props.theme.colors.white};
  -webkit-box-shadow: 6px 4px 26px -6px rgba(0, 0, 0, 0.66);
  -moz-box-shadow: 6px 4px 26px -6px rgba(0, 0, 0, 0.66);
  box-shadow: 6px 4px 26px -6px rgba(0, 0, 0, 0.66);
`;

const CardImage = styled.img`
  width: 100%;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
`;

const CardContent = styled.div`
  width: 100%;
  padding: 1rem;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
`;

const Name = styled.h5`
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: 2rem;
  color: ${(props) => props.theme.colors.grey};
`;
const Price = styled.p`
  font-size: 2.5rem;
  color: ${(props) => props.theme.colors.grey};
  margin-bottom: 0.5rem;
`;

const StyledLazy = styled(LazyLoad)`
  width: 100%;
`;

export default function Card({ name, description, price, imageUrl }) {
  return (
    <CardWrapper>
      {imageUrl ? (
        <StyledLazy>
          <CardImage src={imageUrl ? imageUrl : null} alt={name} />
        </StyledLazy>
      ) : null}

      <CardContent>
        <Name>{name}</Name>
        <Price>{price}</Price>
        <Description>{description}</Description>
      </CardContent>
    </CardWrapper>
  );
}
