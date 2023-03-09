import React, { useRef } from "react";

import airportCodes from "./source/airports.json";

import { MdDeleteOutline } from "react-icons/md";

function InputSegment({
  setDepartureCode,
  setArrivalCode,
  setPassengers,
  setCabinClass,
  removeSegment,
  departureCode,
  arrivalCode,
  cabinClass,
  passengers,
  legList,
  i,
}) {
  const handleChangeFrom = (event) => {
    console.log(event.target.value);
    setDepartureCode(event.target.value);
    legList[i].departureCode = event.target.value;
  };
  const handleChangeTo = (event) => {
    console.log(event.target.value);
    setArrivalCode(event.target.value);
    legList[i].arrivalCode = event.target.value;
  };
  const handleChangeClass = (event) => {
    console.log(event.target.value);
    setCabinClass(event.target.value);
    legList[i].cabinClass = event.target.value;
  };
  const handleChangePassengers = (event) => {
    console.log(event.target.value);
    setPassengers(event.target.value);
    legList[i].passengers = event.target.value;
  };

  const segment = useRef();

  return (
    <div
      className={`segment  capitalize duration-500 p-2 h-23 md:h-28 w-full flex flex-col gap-2 items-center justify-center bg-black/60 text-white  relative`}
      ref={segment}
    >
      <div className="add-icon text-[20px] text-black z-10 absolute bottom-[calc(50%-.8rem)] md:bottom-[calc(50%-1.2rem)] right-[10px]">
        <MdDeleteOutline
          className="text-white text-[1.6rem] md:text-[2.4rem]"
          onClick={() => {
            removeSegment(i);
          }}
        />
      </div>
      <div className="from-to flex w-full ">
        {/* FROM */}
        <div className="from relative flex justify-start w-[50%] gap-2 lg:gap-4">
          <label htmlFor="from-airports"> from:</label>

          <input
            onChange={handleChangeFrom}
            value={departureCode}
            className="w-[35%] lg:w-[25%] text-center text-black capitalize"
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
        </div>
        {/* TO */}
        <div className="to relative flex w-[50%] gap-2 lg:gap-4">
          <label htmlFor="to-airports"> to:</label>

          <input
            onChange={handleChangeTo}
            value={arrivalCode}
            className="w-[35%] lg:w-[25%] text-center text-black capitalize"
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
        </div>
      </div>

      {/* PASSENGERS & CLASS */}

      <div className="passengers-class w-full flex">
        <div className="class w-[50%] flex gap-2 lg:gap-4">
          <label htmlFor="cabin-class">class:</label>

          <input
            onChange={handleChangeClass}
            className=" text-black  capitalize w-[60%] lg:w-[35%] text-center"
            list="class-list"
            id="cabin-class"
            placeholder="economy"
            value={cabinClass}
          />
          <datalist id="class-list">
            <option value="economy"></option>
            <option value="business"> </option>
            <option value="first"></option>
          </datalist>
        </div>
        <div className="passengers w-[50%] flex gap-2 lg:gap-4">
          <span>passengers:</span>
          <input
            defaultValue={1}
            value={passengers}
            onChange={handleChangePassengers}
            className=" w-[20%] lg:w-[25%] text-center text-black"
            type="number"
          />
        </div>
      </div>
    </div>
  );
}

export default InputSegment;
