import React from "react";
import airportCodes from "./source/airports.json";
import styled, { css } from "styled-components";
import { Delete } from "@styled-icons/fluentui-system-filled";

function InputSegment({
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
    <Segment>
      <DeleteContainer
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <DeleteIcon
          onClick={() => {
            removeSegment(i);
            console.log("remove input range");
          }}
        />
      </DeleteContainer>
      <FromTo>
        {/* FROM */}
        <From>
          <label htmlFor="from-airports"> from:</label>

          <InputRange
            onChange={handleChangeFrom}
            value={departureCode}
            list="airport-list"
            id="from-airports"
          />
          <datalist id="airport-list">
            {airportCodes.map((airport, index) => (
              <option key={index} value={airport.code}>
                {airport.name}-{airport.code}
              </option>
            ))}
          </datalist>
        </From>
        {/* TO */}
        <To>
          <label htmlFor="to-airports"> to:</label>

          <InputRange
            onChange={handleChangeTo}
            value={arrivalCode}
            list="airport-list"
            id="to-airports"
          />
          <datalist id="airport-list">
            {airportCodes.map((airport, index) => (
              <option key={index} value={airport.code}>
                {airport.name}-{airport.city}-{airport.code}
              </option>
            ))}
          </datalist>
        </To>
      </FromTo>

      {/* PASSENGERS & CLASS */}

      <PassClassContainer>
        <Class>
          <label htmlFor="cabin-class">class:</label>

          <InputRange
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
          <InputRange
            short
            value={passengers}
            onChange={handleChangePassengers}
            type="text"
            inputMode="numeric"
          />
        </Passenger>
      </PassClassContainer>
    </Segment>
  );
}
const Segment = styled.li`
  text-transform: capitalize;
  transition: 700ms;
  padding: 0.5rem;
  height: 5rem;
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
  width: 100%;
`;
const PassClassContainer = styled.div`
  display: flex;
  width: 100%;
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
    width: 40%;
  }
`;
const Passenger = styled(Range)``;
const From = styled(Range)`
  justify-content: start;
  @media (min-width: 1024px) {
    width: 40%;
  }
`;
const To = styled(Range)``;
const InputRange = styled.input`
  width: 35%;
  text-align: center;
  color: black;
  text-transform: capitalize;
  @media (min-width: 1024px) {
    width: 30%;
  }

  ${(props) =>
    props.short &&
    css`
      width: 20%;
    `};
`;

export default InputSegment;
