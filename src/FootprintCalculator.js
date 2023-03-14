import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import InputSegment from "./InputSegment";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import loading from "./assets/loading.gif";
function FootprintCalculator() {
  const token = "PFZSMPX3TX4GE5GRVF585YC2HREC";
  const [departureCode, setDepartureCode] = useState("");
  const [arrivalCode, setArrivalCode] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [totalPassengers, setTotalPassengers] = useState();
  const [cabinClass, setCabinClass] = useState("");
  const [legs, setLegs] = useState([]);
  const [emissionData, setEmissionData] = useState();
  const [legList, setLegList] = useState([
    { departureCode, arrivalCode, passengers, cabinClass },
  ]);
  const [flgihtExist, setFlgihtExist] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setArrivalCode("");
    setDepartureCode("");
    setPassengers(1);
    setCabinClass("");
    let passengerNumber = legList.map(
      (flightPassenger, i) =>
        parseInt(legList[i].passengers)
    );
    setTotalPassengers(
      passengerNumber.reduce(
        (previousValue, currentValue) => {
          return previousValue + currentValue;
        }
      )
    );
    setLegs(
      legList.map((item, i) => ({
        from: `${legList[i].departureCode}`,
        to: `${legList[i].arrivalCode}`,
        passengers: parseInt(legList[i].passengers),

        class: `${legList[i].cabinClass}`,
      }))
    );
  }, [departureCode, arrivalCode, passengers, cabinClass]);

  const getEmission = () => {
    setFlgihtExist(false);
    setIsLoading(true);

    axios
      .post(
        "https://beta3.api.climatiq.io/travel/flights",
        {
          legs,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data.co2e === 0) {
          setError(true);
        } else {
          setEmissionData(response.data);
        }
        setFlgihtExist(true);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      })
      .finally(() => setIsLoading(false));
  };
  // SEGMENT MANAGEMENT
  const addSegment = () => {
    if (legList.length < 4) {
      setLegList([
        ...legList,
        {
          departureCode,
          arrivalCode,
          passengers,
          cabinClass,
        },
      ]);
    }
  };
  const removeSegment = (i) => {
    if (legList.length > 1) {
      setLegList((prevlegList) => {
        const newlegList = [...prevlegList];
        newlegList.splice(i, 1);
        return newlegList;
      });
    }
  };

  const [parent, enableAnimations] = useAutoAnimate();

  // UI STATE
  const [isDropdownOpen, setIsDropdownOpen] = useState(
    legList.map(() => false)
  );
  useEffect(() => {
    setIsDropdownOpen(legList.map(() => false));
  }, [legList]);

  return (
    <div
      className="bg-[#E1D7C6] relative duration-300 h-full w-full md:w-[90%] flex flex-col items-center justify-center gap-4
      md:gap-6 text-black "
    >
      {/* LOADING */}
      <div
        className={`loading-panel ${
          isLoading ? "z-50 opacity-1" : "-z-10 opacity-0"
        }  backdrop-blur-sm absolute h-full w-full flex items-center justify-center duration-300`}
      >
        <img
          src={loading}
          className="loading  h-20  aspect-square "
          alt="Loading..."
        />
      </div>

      {/* ERROR */}
      <div
        className={`error duration-300 ${
          error ? "opacity-1 z-10" : "opacity-0 -z-10"
        } absolute bg-slate-600 h-[100px] md:h-[200px] w-[90%] top-[30%] flex items-center justify-center  rounded-xl p-2 md:p-3`}
      >
        <div className="border-2 border-[red] h-full w-full flex flex-col items-center justify-center gap-3 md:gap-7 rounded-xl py-3">
          <div className="error-text text-white">
            Seems that your flight doesn't exist
          </div>
          <button
            className="close-error bg-white/60 px-4 rounded-lg text-white "
            onClick={() => {
              setError(false);
            }}
          >
            close
          </button>
        </div>
      </div>

      {/* INPUT */}
      <div
        ref={parent}
        className={`input-data relative 
            ${
              legList.length > 1
                ? "h-[40%] lg:h-[40%]"
                : "h-[20%]"
            } 
         w-[90%]  gap-2 duration-700
        flex flex-col  items-center justify-center rounded overflow-hidden lg:p-2 
        lg:grid lg:place-items-center 
        ${legList.length > 1 ? "lg:grid-cols-2" : ""}
        `}
      >
        {legList.map((segment, i) => (
          <InputSegment
            key={i}
            setDepartureCode={setDepartureCode}
            setArrivalCode={setArrivalCode}
            setPassengers={setPassengers}
            setCabinClass={setCabinClass}
            legList={legList}
            departureCode={segment.departureCode}
            arrivalCode={segment.arrivalCode}
            cabinClass={segment.cabinClass}
            passengers={segment.passengers}
            addSegment={addSegment}
            removeSegment={removeSegment}
            i={i}
          />
        ))}
      </div>

      {/* BUTTONS */}
      <div className="buttons flex w-[90%]  items-center justify-between lg:w-[50%]">
        <button
          className="reset-btn bg-black/50 rounded py-1 px-3 text-white capitalize relative   lg:top-0 "
          onClick={() => {
            console.log("reset list");
            setLegs([]);
            setPassengers(1);
            setTotalPassengers(passengers);
            setLegList([
              {
                departureCode,
                arrivalCode,
                passengers,
                cabinClass,
              },
            ]);
            setEmissionData(null);
          }}
        >
          reset
        </button>
        <button
          className="bg-black/50 px-3 py-1  rounded text-white capitalize"
          onClick={() => {
            console.log("starting fetch");
            getEmission();
          }}
        >
          calculate
        </button>
        <button
          className="plus-btn bg-black/50 rounded py-1 px-3 text-white capitalize relative  lg:top-0   "
          onClick={() => {
            console.log("add input");
            addSegment();
            setEmissionData(null);
          }}
        >
          add
        </button>
      </div>
      {/* OUTPUT */}
      <div className="output relative flex flex-col gap-4 md:gap-6 h-[50%] w-[90%] capitalize lg:flex-row pt-10 ">
        {emissionData &&
        emissionData.legs.length === 1 &&
        flgihtExist ? (
          <div
            className={`recap w-full bg-[#F8F4EA] rounded-lg flex flex-col justify-center items-center capitalize relative 
             lg:h-[200px]    `}
          >
            <div className="recap-logo absolute left-3 top-3">
              recap:
            </div>
            <div className="recap-container my-3 w-[50%] lg:w-[40%]">
              <div className="recap-from-to  w-full flex justify-between">
                <span>flight:</span>
                {`${legs[0].from} - ${legs[0].to}`}
              </div>
              <div className="recap-class w-full flex justify-between">
                <span>class:</span> {`${legs[0].class}`}
              </div>
              <div className="recap-passengers w-full flex justify-between">
                <span>n. passengers:</span>
                {`${legs[0].passengers}`}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div
          className={`general-data flex flex-col gap-4 lg:gap-6 lg:w-[50%] ${
            legList.length > 1
              ? ""
              : "lg:h-[200px] lg:justify-evenly"
          }  `}
        >
          <div className="total flex items-center gap-2 h-8 md:h-12 bg-[#F8F4EA]   rounded-lg p-2 md:p-3 ">
            <span>total C02:</span>
            {emissionData
              ? emissionData.co2e.toFixed(2)
              : ""}
            {emissionData ? emissionData.co2e_unit : ""}
          </div>
          <div className="individual  flex items-center gap-2 h-8 md:h-12 bg-[#F8F4EA]   rounded-lg p-2 md:p-3 ">
            <span>individual C02: </span>
            {emissionData
              ? (
                  emissionData.co2e / totalPassengers
                ).toFixed(2)
              : ""}
            {emissionData ? emissionData.co2e_unit : ""}
          </div>
        </div>

        <div className="multi-flight overflow-y-scroll flex flex-col gap-4 md:gap-6  lg:w-[50%] ">
          {emissionData && emissionData.legs.length > 1
            ? emissionData.legs.map((item, i) => (
                <div
                  key={i}
                  className="individual-flight flex flex-col bg-[#F8F4EA] cursor-pointer   justify-center rounded-lg  "
                  onClick={() => {
                    setIsDropdownOpen((prevState) =>
                      prevState.map((item, index) =>
                        index === i ? !item : false
                      )
                    );
                  }}
                >
                  <div className="emission-header md:h-12 p-2 md:p-3 w-full flex items-center justify-between">
                    <span className="">
                      recap. flight {i + 1}
                    </span>
                    {`${legs[i].from} - ${legs[i].to}`}
                  </div>

                  <div
                    className={`dropdown emission flex  overflow-hidden px-2 md:px-3  w-full 
            ${
              isDropdownOpen[i]
                ? " opacity-1 h-[4em] dropdown-open "
                : "opacity-0 h-0 dropdown-close"
            }`}
                  >
                    <div className="left w-[50%] flex flex-col gap-2 ">
                      <div className="total flex items-center gap-1">
                        <span className="">total:</span>
                        {emissionData.legs[i].co2e.toFixed(
                          2
                        )}
                        {emissionData.legs[i].co2e_unit}
                      </div>
                      <div className="individual flex gap-1">
                        <span>individual:</span>
                        {(
                          emissionData.legs[i].co2e / 7
                        ).toFixed(2)}
                        {emissionData
                          ? emissionData.co2e_unit
                          : ""}
                      </div>
                    </div>
                    <div className="right w-[50%] flex flex-col gap-2 items-end ">
                      <div className="drop-class flex gap-1">
                        <span>class:</span>
                        {`${legs[i].class}`}
                      </div>
                      <div className="drop-passengers flex gap-1">
                        <span>n. passengers:</span>
                        {`${legs[i].passengers}`}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}

export default FootprintCalculator;
