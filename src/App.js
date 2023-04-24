import { useEffect } from "react";
import FootprintCalculator from "./FootprintCalculator";
import Output from "./Output";
import "./index.css";
import LandingPanel from "./LandingPanel";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
function App() {
  useEffect(() => {
    function updateVh() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty(
        "--vh",
        `${vh}px`
      );
    }
    window.addEventListener("resize", updateVh);
    console.log("resize");
  }, []);

  let n = 8;
  return (
    <AppContaneir>
      <LandingPanel />
      <AnimatePresence mode="wait" onExitComplete={true}>
        <Routes>
          <Route
            path="/"
            element={<FootprintCalculator />}
          />
          <Route path="/output" element={<Output />} />
        </Routes>
      </AnimatePresence>
    </AppContaneir>
  );
}

const AppContaneir = styled.div`
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  background-color: #e1d7c6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

export default App;
