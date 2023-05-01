import React, { useEffect, useState } from "react";
import InputSegment from "./InputSegment";

import loading from "./assets/loading.gif";
import { useGlobalContext } from "./context/context";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetch } from "./fetch";
import styled, { css } from "styled-components";
import airportCodes from "./source/airports.json";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";

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
    arrayLength,
    setArrayLength,
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
    if (
      legs[0].from === "" ||
      legs[0].to === "" ||
      legs[0].class === ""
    ) {
      let response = "empty";
      setIsLoading(false);
      setError(true);
      return response;
    } else {
      let response = await fetch(legs);
      if (response.status === 200) {
        console.log(response);
        setEmissionData(response.data);
        setIsLoading(false);
        navigate("/output", { replace: true });
      }
    }
  };

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

  // SEGMENT MANAGEMENT
  // const addSegment = () => {
  //   if (legList.length < 6) {
  //     setArrayLength(arrayLength + 1);
  //     setLegList([
  //       ...legList,
  //       {
  //         departureCode,
  //         arrivalCode,
  //         passengers,
  //         cabinClass,
  //       },
  //     ]);
  //   }
  // };
  const addSegment = async () => {
    setArrayLength(arrayLength + 1);
    if (legList.length < 6) {
      const newSegment = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              departureCode,
              arrivalCode,
              passengers,
              cabinClass,
            }),
          300
        )
      );

      setLegList((prevlegList) => [
        ...prevlegList,
        newSegment,
      ]);
    }
  };
  const removeSegment = (i) => {
    if (legList.length > 1) {
      setArrayLength(arrayLength - 1);

      setLegList((prevlegList) => {
        const newlegList = [...prevlegList];
        newlegList.splice(i, 1);

        return newlegList;
      });
    }
  };

  const [airportList, setAirportList] = useState(
    airportCodes.map((airport, index) => (
      <option key={index} value={airport.code}>
        {airport.name}-{airport.code}
      </option>
    ))
  );

  // UI STATE

  useEffect(() => {
    setIsDropdownOpen(legList.map(() => false));
  }, [legList]);

  return (
    <Container
      as={motion.div}
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
      <LoadingPanel visible={isLoading}>
        <LoadingImg src={loading} alt="Loading..." />
      </LoadingPanel>

      {/* ERROR */}
      <ErrorPanel visible={error}>
        <Border>
          <ErrorText>Please fill all range</ErrorText>
          <CloseError
            onClick={() => {
              setError(false);
            }}
          >
            <CloseIcon />
          </CloseError>
        </Border>
      </ErrorPanel>

      {/* INPUT */}
      <InputContainer
        containerHeight={arrayLength * 6 + "rem"}
        multipleInput={legList.length > 1}
      >
        {legList.map((segment, i) => (
          <InputSegment
            key={i}
            airportList={airportList}
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
      </InputContainer>
      {/* BUTTONS */}
      <ButtonContainer>
        <Button
          as={motion.button}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 10,
          }}
          onClick={() => {
            console.log("reset list");
            setLegs([]);
            setArrayLength(1);
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
        </Button>

        <Button
          as={motion.button}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 10,
          }}
          onClick={() => {
            console.log("starting fetch");
            setIsLoading(true);
            getEmission();
          }}
        >
          calculate
        </Button>

        <Button
          as={motion.button}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 10,
            duration: 2,
          }}
          onClick={() => {
            console.log("add input range");
            addSegment();
            setEmissionData(null);
          }}
        >
          add
        </Button>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LoadingPanel = styled.div`
  position: absolute;
  opacity: 0;
  z-index: -10;
  ${(props) =>
    props.visible &&
    css`
      opacity: 1;
      z-index: 50;
    `};
  backdrop-filter: blur(4px);
  height: 100%;
  width: 100%;
  display: grid;
  place-content: center;
  transition: 300ms;
`;

const LoadingImg = styled.img`
  height: 5rem;
  aspect-ratio: square;
`;
const ErrorPanel = styled.div`
  transition: 300ms;
  opacity: 0;
  z-index: -10;
  ${(props) =>
    props.visible &&
    css`
      opacity: 1;
      z-index: 50;
    `};
  backdrop-filter: blur(4px);
  height: 100px;
  width: 90%;
  position: absolute;
  top: calc(50%-50px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(71 85 105);
  border-radius: 0.75rem;
  padding: 0.3rem 0.3rem;
  overflow: visible;

  @media (min-width: 768px) {
    padding: 0.5rem 0.5rem;
    height: 120px;
    width: 80%;
    top: calc(50%-90px);
  }
  @media (min-width: 1024px) {
    padding: 0.5rem 0.5rem;
    width: 70%;
  }
`;
const Border = styled.div`
  border: 2px solid red;
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  gap: 0.5rem;
  border-radius: 0.75rem;
  overflow: visible;

  @media (min-width: 768px) {
    /* gap: 1.75rem; */
  }
`;
const ErrorText = styled.div`
  color: #fff;
  overflow: visible;
`;
const CloseError = styled.button`
  position: absolute;
  top: -0.7rem;
  right: -0.7rem;
  height: 1.4rem;
  aspect-ratio: 1;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 50%;
  /* padding: 0.3rem 0.5rem; */
  color: #fff;
  /* text-transform: capitalize; */
  transition: 200ms ease-in-out;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    background-color: #000000e9;
  }
`;

const CloseIcon = styled(CloseOutline)`
  height: 30px;
  font-size: 30px;
  color: #fff;
  @media (min-width: 768px) {
    height: 40px;
  }
`;
const InputContainer = styled.ul`
  overflow: visible;
  transition: 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  height: ${(props) => props.containerHeight};
  max-height: 80%;
  @media (min-width: 1024px) {
    padding: 0.5rem;
    display: grid;
    place-items: center;
    gap: 1rem;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    width: 70%;

    ${(props) =>
      props.multipleInput &&
      css`
        grid-template-columns: repeat(2, minmax(0, 1fr));
        height: 70%;
      `};
  }
`;
const ButtonContainer = styled.div`
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10%;
  width: 90%;
  @media (min-width: 1024px) {
    width: 50%;
  }
`;
const Button = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0.25rem;
  padding: 0.4rem 0.5rem;
  color: #fff;
  text-transform: capitalize;
  cursor: pointer;
  border: none;
  -webkit-box-shadow: 8px 8px 15px -3px #000000;
  box-shadow: 8px 8px 15px -3px #000000;
  @media (min-width: 1020px) {
    padding: 10px 20px;
  }
`;

export default FootprintCalculator;
