import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Delete } from "@styled-icons/fluentui-system-filled";
import { AnimatePresence, motion } from "framer-motion";
import { useGlobalContext } from "./context/context";

function InputSegment({
  airportList,
  setDepartureCode,
  setArrivalCode,
  setPassengers,
  setCabinClass,
  legList,
  departureCode,
  arrivalCode,
  cabinClass,
  passengers,
  removeSegment,
  i,
}) {
  const { show, setShow } = useGlobalContext();
  const handleChangeFrom = (event) => {
    setDepartureCode(event.target.value);
    legList[i].departureCode = event.target.value;
  };
  const handleChangeTo = (event) => {
    setArrivalCode(event.target.value);
    legList[i].arrivalCode = event.target.value;
  };
  const handleChangeClass = (event) => {
    setCabinClass(event.target.value);
    legList[i].cabinClass = event.target.value;
  };
  const handleChangePassengers = (event) => {
    setPassengers(event.target.value);
    legList[i].passengers = event.target.value;
  };

  return (
    <AnimatePresence mode="wait">
      {show[i] && (
        <Segment
          key={i}
          as={motion.li}
          initial={{ opacity: 0, height: 0, padding: 0 }}
          animate={{
            opacity: 1,
            height: "9vh",
            transition: {
              duration: 0.3,
            },
          }}
          exit={{
            opacity: 0,
            transition: { opacity: 2 },
          }}
        >
          <DeleteContainer
            as={motion.div}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10,
              duration: 2,
            }}
          >
            <DeleteIcon
              onClick={() => {
                removeSegment(i);
              }}
            />
          </DeleteContainer>
          {show[i]}
          <FromTo>
            {/* FROM */}
            <From>
              <label htmlFor="from-airports"> from:</label>

              <FromInput
                onChange={handleChangeFrom}
                value={departureCode}
                list="airport-list"
                id="from-airports"
              />
              <datalist id="airport-list">
                {airportList}
              </datalist>
            </From>
            {/* TO */}
            <To>
              <label htmlFor="to-airports"> to:</label>

              <ToInput
                onChange={handleChangeTo}
                value={arrivalCode}
                list="airport-list"
                id="to-airports"
              />
              <datalist id="airport-list">
                {airportList}
              </datalist>
            </To>
          </FromTo>
          {/* PASSENGERS & CLASS */}
          <PassClassContainer>
            <Class>
              <label htmlFor="cabin-class">class:</label>

              <ClassInput
                onChange={handleChangeClass}
                list="class-list"
                id="cabin-class"
                value={cabinClass}
              />
              <datalist id="class-list">
                <option value="economy"></option>
                <option value="business"></option>
                <option value="first"></option>
              </datalist>
            </Class>
            <Passenger>
              <span>passengers:</span>
              <PassegnerInput
                short
                value={passengers}
                onChange={handleChangePassengers}
                type="text"
                inputMode="numeric"
              />
            </Passenger>
          </PassClassContainer>
        </Segment>
      )}
    </AnimatePresence>
  );
}
const Segment = styled.li`
  text-transform: capitalize;

  widows: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  position: relative;
  border-radius: 0.5rem;
  -webkit-box-shadow: 8px 8px 15px -3px #000000;
  box-shadow: 8px 8px 15px -3px #000000;
`;
const DeleteContainer = styled.div`
  cursor: pointer;
  font-size: 20px;
  position: absolute;
  top: 15%;

  right: 10px;
  z-index: 20;
  @media (min-width: 768px) {
    font-size: 30px;
  }
`;
const DeleteIcon = styled(Delete)`
  height: 30px;
  color: #fff;
  @media (min-width: 768px) {
    height: 40px;
  }
`;
const FromTo = styled.div`
  display: flex;
  width: 90%;
`;
const PassClassContainer = styled.div`
  display: flex;
  width: 90%;
`;
const Range = styled.div`
  position: relative;
  display: flex;

  width: 50%;
  gap: 0.5rem;
  @media (min-width: 1024px) {
    gap: 1rem;
  }
`;
const Class = styled(Range)`
  justify-content: start;
  @media (min-width: 1024px) {
    width: 50%;
  }
`;
const Passenger = styled(Range)`
  @media (min-width: 1024px) {
    width: 50%;
  }
`;
const From = styled(Range)`
  justify-content: start;
  @media (min-width: 1024px) {
    width: 50%;
  }
`;
const To = styled(Range)``;
const InputRange = styled.input`
  all: unset;
  width: 40%;
  text-align: center;
  color: black;
  text-transform: capitalize;
  background-color: #fff;
  border-radius: 0.15rem;

  @media (min-width: 1024px) {
    width: 40%;
  }

  ${(props) =>
    props.short &&
    css`
      width: 20%;
    `};
`;
const FromInput = styled(InputRange)`
  max-width: 90px;
`;
const ToInput = styled(InputRange)`
  max-width: 90px;
`;
const ClassInput = styled(InputRange)`
  width: 60%;
  max-width: 160px;
  @media (min-width: 1024px) {
    width: 50%;
  }
`;
const PassegnerInput = styled(InputRange)`
  @media (min-width: 1024px) {
    width: 20%;
  }
`;

export default InputSegment;
