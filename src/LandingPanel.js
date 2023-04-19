import React, { useEffect, useState } from "react";
import airplane from "./assets/airplane.png";
import { useGlobalContext } from "./context/context";

function LandingPanel() {
  const { landingPanelOpen, setLandingPanelOpen } =
    useGlobalContext();
  useEffect(() => {
    setTimeout(() => {
      setLandingPanelOpen(false);
    }, 3000);
  });
  return (
    <div
      className={`landing-panel absolute h-full w-full flex gap-6  flex-col items-center justify-center  bg-[#E1D7C6]/30 backdrop-blur-lg duration-500 
        ${
          landingPanelOpen
            ? "z-50 opacity-1"
            : "-z-50 opacity-0"
        }
        md:gap-8
        `}
    >
      <span
        className="landing-title text-4xl font-black  tracking-widest
        md:text-6xl md:py-2
        "
      >
        FlightFootPrint
      </span>
      <span
        className="landing-quote text-2xl font-bold
        md:text-3xl mb-24 "
      >
        Viaggiare con consapevolezza
      </span>
      <img src={airplane} className={`airplane`} alt="" />
    </div>
  );
}

export default LandingPanel;
