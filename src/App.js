import { useEffect, useState } from "react";
import FootprintCalculator from "./FootprintCalculator";

import "./index.css";

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
  const [landingPanelOpen, setLandingPanelOpen] =
    useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLandingPanelOpen(false);
      console.log("useffect");
    }, 1800);
  });

  return (
    <div className="App w-screen bg-[#E1D7C6]  md:text-2xl flex flex-col items-center justify-center overflow-hidden ">
      <div
        className={`landing-panel absolute h-full w-full flex gap-6  flex-col items-center justify-center  bg-[#E1D7C6]/30 backdrop-blur-lg duration-500 ${
          landingPanelOpen
            ? "z-50 opacity-1"
            : "-z-50 opacity-0"
        }
        md:gap-8
        
        `}
      >
        <span
          className="landing-title text-4xl font-black tracking-widest
        md:text-6xl md:py-2
        "
        >
          FlightFootPrint
        </span>
        <span
          className="landing-quote text-2xl font-bold
        md:text-3xl"
        >
          Viaggiare con consapevolezza
        </span>
      </div>

      <FootprintCalculator />
    </div>
  );
}

export default App;
