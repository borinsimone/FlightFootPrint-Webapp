import { useEffect } from "react";
import FootprintCalculator from "./FootprintCalculator";
import Output from "./Output";
import "./index.css";
import LandingPanel from "./LandingPanel";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
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

  const location = useLocation();
  let n = 8;
  return (
    <div className="App w-screen bg-[#E1D7C6]  md:text-2xl flex flex-col items-center justify-center overflow-hidden ">
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
    </div>
  );
}

export default App;
