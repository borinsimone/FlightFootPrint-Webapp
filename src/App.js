import { useEffect, useState } from "react";
import FootprintCalculator from "./FootprintCalculator";
import "./index.css";

function App() {
  // let vh = window.innerHeight * 0.01;
  // document.documentElement.style.setProperty(
  //   "--vh",
  //   `${vh}px`
  // );
  useEffect(() => {
    function updateVh() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty(
        "--vh",
        `${vh}px`
      );
    }
    window.addEventListener("resize", updateVh);
  }, []);

  return (
    <div className="App w-screen bg-[#E1D7C6] text-white md:text-2xl flex flex-col items-center justify-center overflow-hidden ">
      <FootprintCalculator />
    </div>
  );
}

export default App;
