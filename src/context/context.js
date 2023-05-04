import React, {
  useContext,
  useEffect,
  useState,
} from "react";

const GlobalContext = React.createContext();

const ContextProvider = ({ children }) => {
  const [landingPanelOpen, setLandingPanelOpen] =
    useState(true);
  const [emissionData, setEmissionData] = useState();
  const [legs, setLegs] = useState([]);
  const [departureCode, setDepartureCode] = useState("");
  const [arrivalCode, setArrivalCode] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [totalPassengers, setTotalPassengers] = useState();
  const [cabinClass, setCabinClass] = useState("");
  const [legList, setLegList] = useState([
    { departureCode, arrivalCode, passengers, cabinClass },
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(
    legList.map(() => false)
  );
  const [arrayLength, setArrayLength] = useState(1);
  const [show, setShow] = useState(legList.map(() => true));

  return (
    <GlobalContext.Provider
      value={{
        emissionData,
        setEmissionData,
        legs,
        setLegs,
        isDropdownOpen,
        setIsDropdownOpen,
        departureCode,
        setDepartureCode,
        arrivalCode,
        setArrivalCode,
        passengers,
        setPassengers,
        totalPassengers,
        setTotalPassengers,
        cabinClass,
        setCabinClass,
        legList,
        setLegList,
        landingPanelOpen,
        setLandingPanelOpen,
        arrayLength,
        setArrayLength,
        show,
        setShow,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
export { GlobalContext, ContextProvider };
