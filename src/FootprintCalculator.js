import React, { useEffect, useState } from "react";
import InputSegment from "./InputSegment";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import loading from "./assets/loading.gif";
import { useGlobalContext } from "./context/context";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { fetch } from "./fetch";
import airplane from "./assets/airplane.png";
function FootprintCalculator() {
  const {
    setEmissionData,
    legs,
    setLegs,

    setIsDropdownOpen,
    departureCode,
    setDepartureCode,
    arrivalCode,
    setArrivalCode,
    passengers,
    setPassengers,
    setTotalPassengers,
    cabinClass,
    setCabinClass,
    legList,
    setLegList,
    landingPanelOpen,
    setLandingPanelOpen,
  } = useGlobalContext();

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
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
    let response = await fetch(legs);
    if (response.status === 200) {
      console.log(response);
      setEmissionData(response.data);
      setIsLoading(false);
      navigate("/output", { replace: true });
    }

    if (response === "empty") {
      setError(true);
      setIsLoading(false);
    }
  };

  // const getEmission = async () => {
  //   setFlightExist(false);
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.post(
  //       "https://beta3.api.climatiq.io/travel/flights",
  //       {
  //         legs,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${process.env.REACT_APP_CLIMATIQ_KEY}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     console.log(response);
  //     if (response.data.co2e === 0) {
  //       setError(true);
  //     } else {
  //       setEmissionData(response.data);
  //       navigate("/output");
  //     }
  //     setFlightExist(true);
  //   } catch (error) {
  //     console.error(error);
  //     setError(true);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // GoCLimate api fetch

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
  //     cabin_class: `economy`,
  //     passengers: `${totalPassengers}`,
  //   };

  //   try {
  //     const response = await axios.get(
  //       "https://api.goclimate.com/v1/flight_footprint",
  //       {
  //         params,
  //         auth: {
  //           username: ${process.env.REACT_APP_GOCLIMATE_KEY},
  //           password: "",
  //         },
  //       }
  //     );
  //     console.log(response);
  //     setEmissionData(response.data);
  //   } catch (error) {
  //     console.error(error);
  //     setError(true);
  //   } finally {
  //     setIsLoading(false);
  //   }
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

  useEffect(() => {
    setIsDropdownOpen(legList.map(() => false));
  }, [legList]);

  return (
    <motion.div
      className="relative bg-[#motion.] h-full w-full  flex flex-col justify-center items-center"
      initial={{
        opacity: 0,
        transition: { duration: 0.5 },
      }}
      animate={{
        opacity: 1,
        transition: { duration: 0.5 },
      }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      {/* LOADING */}
      <div
        className={`loading-panel absolute ${
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
        } absolute bg-slate-600 h-[100px] md:h-[200px] w-[90%] lg:w-[60%] top-[calc(50%-50px)] md:top-[calc(50%-100px)] flex items-center justify-center  rounded-xl p-2 md:p-3`}
      >
        <div className="border-4 border-[red]/70 h-full w-full flex flex-col items-center justify-center gap-3 md:gap-7 rounded-xl py-3">
          <div className="error-text text-white">
            Please fill all range
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
         ${legList.length > 1 ? "h-[80%] " : "h-44"}
              w-[90%]   flex flex-col justify-evenly duration-500
              lg:p-2 lg:grid lg:place-items-center lg:gap-4 
        ${
          legList.length > 1
            ? "lg:grid-cols-2 lg:h-[70%] "
            : "lg:grid-cols-1 lg:w-[70%]"
        } overflow-visible
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
        className={` overflow-visible flex items-center justify-between h-[10%]  w-[90%] lg:w-[50%]`}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="reset-btn  bg-black/50 rounded py-1 px-3 text-white capitalize relative lg:top-0 "
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
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className=" bg-black/50 px-3 py-1  rounded text-white capitalize"
          onClick={() => {
            console.log("starting fetch");
            setIsLoading(true);
            getEmission();
          }}
        >
          calculate
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="plus-btn  bg-black/50 rounded py-1 px-3 text-white capitalize relative  lg:top-0"
          onClick={() => {
            console.log("add input range");
            addSegment();
            setEmissionData(null);
          }}
        >
          add
        </motion.button>
      </div>
    </motion.div>
  );
}

export default FootprintCalculator;
