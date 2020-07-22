import React from "react";
import styled, { keyframes } from "styled-components";

const LoaderAnimation = keyframes`
  100% {
			transform: rotate(360deg)
	}
`;

const Spinner = styled.span`
  height: 3.6rem;
  width: 3.6rem;
  display: inline-block;
  border: 0.4em solid transparent;
  border-color: #eee;
  border-top-color: #3e67ec;
  border-radius: 50%;
  animation: ${LoaderAnimation} 1s linear infinite;
`;

export default function Loader({ className }) {
  return <Spinner className={className}></Spinner>;
}
