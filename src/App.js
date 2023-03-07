import FootprintCalculator from "./FootprintCalculator";
import "./index.css";

function App() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty(
    "--vh",
    `${vh}px`
  );

  return (
    <div className="App w-screen bg-[#E1D7C6] text-white md:text-2xl flex flex-col items-center justify-center overflow-hidden ">
      <FootprintCalculator />
    </div>
  );
}

export default App;
