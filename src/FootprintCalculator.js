import React, { useEffect, useState } from "react";
import axios from "axios";
import InputSegment from "./InputSegment";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import loading from "./assets/loading.gif";
import Output from "./Output";

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

  const getEmission = async () => {
    setFlgihtExist(false);
    setIsLoading(true);
    try {
      const response = await axios.post(
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
      );
      console.log(response);
      if (response.data.co2e === 0) {
        setError(true);
      } else {
        setEmissionData(response.data);
      }
      setFlgihtExist(true);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };
  // GoCLimate api fetch example
  // const [climateSegment, setClimateSegment] = useState([]);
  // const updateSegment = () => {
  //   setClimateSegment(
  //     legList.map((item, i) => ({
  //       origin: `${legList[i].departureCode}`,
  //       destination: `${legList[i].arrivalCode}`,
  //     }))
  //   );
  // };

  // const goClimateFetch = async () => {
  //   const params = {
  //     segments: [...climateSegment],
  //     // cabin_class: `${cabinClass}`,
  //     cabin_class: `economy`,
  //     passengers: `${totalPassengers}`,
  //   };
  //   try {
  //     const response = await axios.get(
  //       "https://api.goclimate.com/v1/flight_footprint",
  //       {
  //         params,
  //         auth: {
  //           username: "bea8d22f4c50ffd8ec370d2a",
  //           password: "",
  //         },
  //       }
  //     );
  //     console.log(response);
  //   } catch (error) {}
  // };

  // SEGMENT MANAGEMENT

  const addSegment = () => {
    if (legList.length < 6) {
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

  const [parent] = useAutoAnimate();

  // UI STATE
  const [isDropdownOpen, setIsDropdownOpen] = useState(
    legList.map(() => false)
  );
  useEffect(() => {
    setIsDropdownOpen(legList.map(() => false));
  }, [legList]);

  return (
    <div className="relative bg-[#E1D7C6] h-full w-full  flex flex-col justify-center items-center">
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
        } absolute bg-slate-600 h-[100px] md:h-[200px] w-[90%] lg:w-[60%] top-[30%] flex items-center justify-center  rounded-xl p-2 md:p-3`}
      >
        <div className="border-4 border-[red]/70 h-full w-full flex flex-col items-center justify-center gap-3 md:gap-7 rounded-xl py-3">
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
        className={` mt-4 
         ${legList.length > 1 ? "h-[90%]" : "h-44"}
              w-[90%]   flex flex-col justify-evenly duration-500
              lg:p-2 lg:grid lg:place-items-center lg:gap-4 
        ${
          legList.length > 1
            ? "lg:grid-cols-2 "
            : "lg:grid-cols-1 lg:w-[70%]"
        }

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
            removeSegment={removeSegment}
            i={i}
          />
        ))}
      </div>
      {/* BUTTONS */}
      <div
        className={`flex items-center justify-between h-[10%]  w-[90%] lg:w-[50%]  `}
      >
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
            console.log("add input range");
            addSegment();
            setEmissionData(null);
          }}
        >
          add
        </button>
      </div>
      {/* OUTPUT */}
      <Output
        emissionData={emissionData}
        setEmissionData={setEmissionData}
        legs={legs}
        flgihtExist={flgihtExist}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        totalPassengers={totalPassengers}
      />
    </div>
  );
}

export default FootprintCalculator;
