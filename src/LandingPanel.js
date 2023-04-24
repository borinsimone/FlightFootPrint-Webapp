import React, { useEffect, useState } from "react";
import airplane from "./assets/airplane.png";
import { useGlobalContext } from "./context/context";
import styled, { css, keyframes } from "styled-components";
function LandingPanel() {
  const { landingPanelOpen, setLandingPanelOpen } =
    useGlobalContext();
  useEffect(() => {
    setTimeout(() => {
      setLandingPanelOpen(false);
    }, 3000);
  });

  return (
    <LandingContainer visible={landingPanelOpen}>
      <LandingTitle>FlightFootPrint</LandingTitle>
      <LandingQuote>
        Viaggiare con consapevolezza
      </LandingQuote>
      <Airplane src={airplane} alt="airplane" />
    </LandingContainer>
  );
}

const LandingContainer = styled.div`
  background: linear-gradient(
    0deg,
    rgb(144, 131, 108) 0%,
    rgba(255, 207, 0, 0) 50%,
    rgb(144, 131, 108) 100%
  );
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  opacity: 0;
  z-index: -10;
  ${(props) =>
    props.visible &&
    css`
      opacity: 1;
      z-index: 50;
    `};

  backdrop-filter: blur(16px);
  @media (min-width: 768px) {
    gap: 2rem;
  }
`;
const fade_in = keyframes`
from{opacity:0;}
to{opacity:1}
`;
const LandingTitle = styled.span`
  font-size: 2.25rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  transition: 500ms;
  opacity: 0;
  overflow: visible;
  animation-name: ${fade_in};
  animation-delay: 700ms;
  animation-duration: 500ms;
  animation-fill-mode: forwards;
  @media (min-width: 768px) {
    font-size: 3.75rem;
    padding: 0.5rem 0 0.5rem 0;
  }
`;
const LandingQuote = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  transition: 500ms;
  opacity: 0;
  overflow: visible;
  animation-name: ${fade_in};
  animation-delay: 1200ms;
  animation-duration: 500ms;
  animation-fill-mode: forwards;
  @media (min-width: 768px) {
    font-size: 1.875rem;
  }
`;
const slide_in = keyframes`
  0% {
    transform: rotate(90deg) translateY(100vw);
  }

  50% {
    transform: rotate(90deg) translateY(0);
  }
  100% {
    transform: rotate(90deg) translateY(-100vw);
  }`;

const Airplane = styled.img`
  aspect-ratio: 1;
  height: 100px;
  transform: rotate(90deg) translateY(100vw);
  animation-name: ${slide_in};
  animation-delay: 800ms;
  animation-duration: 2500ms;
  animation-fill-mode: forwards;
`;

export default LandingPanel;
